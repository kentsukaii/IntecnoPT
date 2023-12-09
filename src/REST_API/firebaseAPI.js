// Import the necessary Firestore modules
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase"; // Import the already initialized Firestore

console.log("Load imports from firebaseAPI.js")

// Function to add a product to the database
async function addProduct(product) {
    const productRef = doc(firestore, 'Products', product.Name);
    
    // Check if the product already exists in the database
    const docSnap = await getDoc(productRef);
    if (docSnap.exists()) {
        console.log('Product ' + product.Name + ' already exists in the database.');
        return;
    }
    
    // If the product doesn't exist, add it to the database
    await setDoc(productRef, {
        Category: product.category,
        Subcategory: product.subcategory,
        Description: product.description,
        ImageReference: product.imageReference,
        Name: product.name,
        Price: product.price,
        StockAvailable: product.stockAvailable,
        StockStored: product.stockStored
    }).catch(error => {
        console.error('Error writing to database: ', error);
    });
}

// Export the function so it can be used elsewhere
export { addProduct };
