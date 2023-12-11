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
  updateDoc,
  arrayRemove
 
} from "firebase/firestore";
import { firestore, storage } from "../firebase"; // Import the already initialized Firestore and Storage
import { ref, listAll, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";


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
      return { ...product, id: doc.id, isBestSeller: true };
    }
    return { ...product, id: doc.id };
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
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// add random orders to Orders
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

// Create bookmarks into database
export async function bookmarkProduct(productId, setShowModal) {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  console.log('userId:', userId); // Debugging line
  console.log('productId:', productId); // Debugging line

  const userBookmarksRef = doc(collection(firestore, 'Bookmarks'), userId);

  // Add the product ID to the array of bookmarked products
  await setDoc(userBookmarksRef, {
    bookmarkedProducts: arrayUnion(productId)
  }, { merge: true });

  // Show the modal
  setShowModal(true);
}


// Load products in user bookmark list
export async function loadBookmarkedProducts() {
  const auth = getAuth();
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    console.log('Loading bookmarked products for user:', userId);
    const userBookmarksRef = doc(collection(firestore, 'Bookmarks'), userId);
    const docSnapshot = await getDoc(userBookmarksRef);
    if (docSnapshot.exists()) {
      console.log('Bookmarked products loaded:', docSnapshot.data().bookmarkedProducts);
      const bookmarkedProductIds = docSnapshot.data().bookmarkedProducts;
      const productCollectionRef = collection(firestore, 'Products');
      const productDocs = await Promise.all(bookmarkedProductIds.map((productId) => getDoc(doc(productCollectionRef, productId))));
      const bookmarkedProducts = productDocs.map((productDoc) => ({ id: productDoc.id, ...productDoc.data() }));
      console.log('Bookmarked product details loaded:', bookmarkedProducts);
      return bookmarkedProducts;
    } else {
      console.error('No such document!');
    }
  } else {
    console.log('No user is currently signed in.');
  }
  return [];
}

// Remove the desired product from your bookmarks and update it to the client
export async function removeBookmarkedProduct(productId) {
  const auth = getAuth();
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    console.log('Removing bookmarked product for user:', userId);
    const userBookmarksRef = doc(collection(firestore, 'Bookmarks'), userId);
    await updateDoc(userBookmarksRef, {
      bookmarkedProducts: arrayRemove(productId)
    });
    console.log('Product removed from bookmarks:', productId);
  } else {
    console.log('No user is currently signed in.');
  }
}


// Load products in user cart
export async function loadCartProducts() {
  const auth = getAuth();
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    console.log('Loading cart products for user:', userId);
    const userCartRef = doc(collection(firestore, 'Cart'), userId);
    const docSnapshot = await getDoc(userCartRef);
    if (docSnapshot.exists()) {
      console.log('Cart products loaded:', docSnapshot.data().productsList);
      const cartProductIds = docSnapshot.data().productsList;
      const productCollectionRef = collection(firestore, 'Products');
      const productDocs = await Promise.all(cartProductIds.map((productId) => getDoc(doc(productCollectionRef, productId))));
      const cartProducts = productDocs.map((productDoc) => ({ id: productDoc.id, ...productDoc.data() }));
      console.log('Cart product details loaded:', cartProducts);
      return cartProducts;
    } else {
      console.error('No such document!');
    }
  } else {
    console.log('No user is currently signed in.');
  }
  return [];
}

export async function addProductToCart(productId) {
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const userCartRef = doc(collection(firestore, 'Cart'), userId);

  // Get the current document
  const docSnap = await getDoc(userCartRef);

  let currentCount = 0;
  let productsList = [];
  if (docSnap.exists()) {
    // Get the current count and products list
    currentCount = docSnap.data().count || 0;
    productsList = docSnap.data().productsList || [];
  }

  // Only increment the count if the product is not already in the cart
  if (!productsList.includes(productId)) {
    currentCount++;
    productsList.push(productId);
  }

  // Update the products list and the count
  await setDoc(userCartRef, {
    productsList: productsList,
    count: currentCount
  }, { merge: true });
  
  getProductCount()
  console.log('Product added to cart');
}

export async function removeCartItem(productId) {
  const auth = getAuth();
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    const userCartRef = doc(collection(firestore, 'Cart'), userId);

    // Get the current document
    const docSnap = await getDoc(userCartRef);

    let currentCount = docSnap.data().count || 0;
    let productsList = docSnap.data().productsList || [];

    // Only decrement the count if the product is in the cart
    if (productsList.includes(productId)) {
      currentCount = currentCount > 0 ? currentCount - 1 : 0;
      const index = productsList.indexOf(productId);
      if (index > -1) {
        productsList.splice(index, 1);
      }
    }

    // Update the products list and the count
    await updateDoc(userCartRef, {
      productsList: productsList,
      count: currentCount
    });

    getProductCount()
    console.log('Product removed from cart:', productId);
  } else {
    console.log('No user is currently signed in.');
  }
}

async function getProductCount() {
  const auth = getAuth();
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;

    const userCartRef = doc(collection(firestore, 'Cart'), userId);
    const docSnap = await getDoc(userCartRef);

    if (docSnap.exists()) {
      const count = docSnap.data().count || 0;
      return count;
    }
  }
  return 0;
}






export { addProduct, addOrder, getTopSellingProducts, addRandomOrders, getProductCount };
