// Import the necessary modules and functions
import { addProduct } from '../firebaseAPI';
import productData from './products.json';

console.log('Successfully imported addProduct and productData');

// Function to load data into the database
async function loadData() {
    console.log('Starting to load data...');
    
    // Loop through each subcategory in productData.Products
    for (let subcategoryKey in productData.Products) {
        // Loop through each product in the subcategory
        for (let product of productData.Products[subcategoryKey]) {
            // Check if the product has a Category field and it's not undefined
            if (product.Category !== undefined) {
                // Add the product to the Firebase database
                await addProduct(product);
                console.log('Added product: ' + product.Name);
            } else {
                console.log('Skipped product due to undefined Category: ', product);
            }
        }
    }
    
    console.log('Finished loading data');
}

loadData();


// Export the function so it can be used elsewhere
export { loadData };
