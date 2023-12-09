// Import the necessary Firebase modules
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase"; // Import the already initialized app

const db = getDatabase(app);

// Function to add a product to the database
async function addProduct(category, subcategory, product) {
    const productRef = ref(db, 'Products/' + category + '/' + subcategory + '/' + product.id);
    
    // Check if the product already exists in the database
    const snapshot = await get(productRef);
    if (snapshot.exists()) {
        console.log('Product ' + product.id + ' already exists in the database.');
        return;
    }
    
    // If the product doesn't exist, add it to the database
    set(productRef, {
        Category: product.category,
        Description: product.description,
        ImageReference: product.imageReference,
        Name: product.name,
        Price: product.price,
        StockAvailable: product.stockAvailable,
        StockStored: product.stockStored
    });
}


// Export the function so it can be used elsewhere
export { addProduct };
