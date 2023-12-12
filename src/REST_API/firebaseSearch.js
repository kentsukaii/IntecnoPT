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
  arrayRemove,
} from "firebase/firestore";
import { firestore, storage } from "../firebase"; // Import the already initialized Firestore and Storage
import { ref, listAll, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";

console.log("Load imports from firebaseSearch.js");

// Function to get products based on stock availability
async function getProductsByStock(available) {
  let q;
  if (available) {
    // If available is true, get products with stock greater than 0
    q = query(
      collection(firestore, "Products"),
      where("StockAvailable", ">", 0)
    );
  } else {
    // If available is false, get products with stock equal to 0
    q = query(
      collection(firestore, "Products"),
      where("StockAvailable", "==", 0)
    );
  }
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => {
    const product = doc.data();
    return { ...product, id: doc.id };
  });
  console.log(products); // Log the products to the console
  return products;
}

// Fetch products based on search term
async function fetchProducts(searchTerm) {
  const productsRef = collection(firestore, "Products");
  const q = query(productsRef, where("Name", "==", searchTerm));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}

async function fetchProductsByCategory(category) {
  const productsRef = collection(firestore, "Products");
  const q = query(productsRef, where("Category", "==", category));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}

function filterProducts(products, showAvailable, showOutOfStock) {
  return products.filter((product) => {
    if (showAvailable && product.StockAvailable > 0) {
      return true;
    }
    if (showOutOfStock && product.StockAvailable === 0) {
      return true;
    }
    return false;
  });
}

// Function to fetch all products
async function fetchAllProducts() {
  const productsRef = collection(firestore, "Products");
  const querySnapshot = await getDocs(productsRef);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}



async function canCheckout() {
  const auth = getAuth();
  const user = auth.currentUser;

  // Check if the user is logged in
  if (!user) {
    return false;
  }

  // Get the user's cart
  const cartRef = doc(firestore, 'Cart', user.uid);
  const cartSnap = await getDoc(cartRef);

  // Check if the cart exists
  if (!cartSnap.exists()) {
    return false;
  }

  // Get the products in the cart
  const productsList = cartSnap.data().productsList;

  // Check if each product is available
  for (const productId of productsList) {
    const productRef = doc(firestore, 'Products', productId);
    const productSnap = await getDoc(productRef);

    // Check if the product exists and is available
    if (!productSnap.exists() || productSnap.data().StockAvailable <= 0) {
      return false;
    }
  }

  // If all checks pass, return true
  return true;
}


export {
  getProductsByStock,
  fetchProducts,
  fetchProductsByCategory,
  filterProducts,
  fetchAllProducts,
  canCheckout
};
