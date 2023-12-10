// Import the necessary Firestore modules
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore, storage } from "../firebase"; // Import the already initialized Firestore and Storage
import { ref, listAll, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

console.log("Load imports from firebaseAPI.js");

async function getRandomImageName(category) {
  const imagesRef = ref(storage, category);
  try {
    const list = await listAll(imagesRef);
    if (list.items.length === 0) {
      // No images in the category folder, use a placeholder image name or a default image URL
      return "placeholder.png"; // or return "https://example.com/default-image.png";
    }
    const randomIndex = Math.floor(Math.random() * list.items.length);
    const imageName = list.items[randomIndex].name;
    return imageName;
  } catch (error) {
    // If the folder doesn't exist, create it by uploading a placeholder image
    const placeholderRef = ref(storage, `${category}/placeholder.png`);
    await uploadBytes(placeholderRef, new Blob([])); // Upload an empty file
    return "placeholder.png";
  }
}

// Function to add a product to the database
async function addProduct(product) {
  const q = query(
    collection(firestore, "Products"),
    where("Name", "==", product.Name)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    console.log("Product " + product.Name + " already exists in the database.");
    return;
  }
  const productRef = doc(collection(firestore, "Products"));
  const imageName = await getRandomImageName(product.Category);
  await setDoc(productRef, {
    Category: product.Category,
    Subcategory: product.Subcategory,
    Description: product.Description,
    ImageReference: imageName, // store the image name instead of the URL
    Name: product.Name,
    Price: product.Price,
    StockAvailable: product.StockAvailable,
    StockStored: product.StockStored,
    Available: product.Available, // new field
    ExpectedDeliveryDate: product.ExpectedDeliveryDate, // new field
    Bookmark: product.Bookmark, // new field
    OnSale: product.OnSale, // new field
    SalePercentage: product.SalePercentage, // new field
  }).catch((error) => {
    console.error("Error writing to database: ", error);
  });
}

// Function to add an order to the database
async function addOrder(userId, productIds) {
  const orderRef = doc(collection(firestore, "Orders"));
  await setDoc(orderRef, {
    userId: userId,
    orderDate: new Date(),
    products: productIds,
  });

  // Increment salesCount for each ordered product
  for (let productId of productIds) {
    const productRef = doc(collection(firestore, "Products"), productId);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      await setDoc(productRef, {
        ...productData,
        salesCount: (productData.salesCount || 0) + 1,
      });
    }
  }
}

// Function to get the top 15 most sold products
async function getTopSellingProducts() {
  const q = query(
    collection(firestore, "Products"),
    orderBy("salesCount", "desc"),
    limit(15)
  );
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc, index) => {
    const product = doc.data();
    if (index === 0) {
      // If the product is the first one in the array (most sold)
      return { ...product, isBestSeller: true };
    }
    return product;
  });
  console.log(products); // Log the products to the console
  return products;
}

// Function to get the top 15 products that are on sale
export async function getOnSaleProducts() {
  const q = query(
    collection(firestore, "Products"),
    where("OnSale", "==", true),
    limit(15)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

async function addRandomOrders() {
  // Fetch all products
  const productsSnapshot = await getDocs(collection(firestore, "Products"));
  const productIds = productsSnapshot.docs.map((doc) => doc.id);

  // Fetch all users
  const usersSnapshot = await getDocs(collection(firestore, "Users"));
  const userIds = usersSnapshot.docs.map((doc) => doc.id);

  // Generate random orders
  for (let i = 0; i < 10; i++) {
    // Change this to the number of orders you want to generate
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    const randomProductIds = productIds
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * productIds.length) + 1);
    await addOrder(randomUserId, randomProductIds);
  }
}

// Function to bookmark a product
export async function bookmarkProduct(productId) {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const bookmarkedProductRef = doc(collection(db, 'BookmarkedProducts'));
  
    // Create a new document in the 'BookmarkedProducts' collection
    await setDoc(bookmarkedProductRef, { 
      userId: userId,
      productId: productId
    });
  }


export { addProduct, addOrder, getTopSellingProducts, addRandomOrders };
