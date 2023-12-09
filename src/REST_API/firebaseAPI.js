// Import the necessary Firestore modules
import { collection, addDoc, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; // Import the already initialized Firestore

console.log("Load imports from firebaseAPI.js")

// Function to add a product to the database
async function addProduct(product) {
    // Create a query to find documents with the same 'Name' field as the product
    const q = query(collection(firestore, 'Products'), where('Name', '==', product.Name));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // If a document with the same 'Name' field exists, log a message and return
    if (!querySnapshot.empty) {
        console.log('Product ' + product.Name + ' already exists in the database.');
        return;
    }

    // If no document with the same 'Name' field exists, add the product to the database
    const productRef = doc(collection(firestore, 'Products')); // This will automatically generate a unique ID for the document
    await setDoc(productRef, {
        Category: product.Category,
        Subcategory: product.Subcategory,
        Description: product.Description,
        ImageReference: product.ImageReference,
        Name: product.Name,
        Price: product.Price,
        StockAvailable: product.StockAvailable,
        StockStored: product.StockStored
    }).catch(error => {
        console.error('Error writing to database: ', error);
    });
}



// Export the function so it can be used elsewhere
export { addProduct };
