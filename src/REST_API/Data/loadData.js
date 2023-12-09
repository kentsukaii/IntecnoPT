// Import the necessary modules and functions
import { addProduct } from '../firebaseAPI';
import productData from './products.json';
import categories from './categories.json'; // Import categories.json

console.log('Successfully imported addProduct, productData, and categories');

// Function to load data into the database
async function loadData() {
    console.log('Starting to load data...');
    
    // Loop through each category in the categories
    for (let category of categories.Categories) {
        // Loop through each subcategory in the category
        for (let subcategory of category.Subcategories) {
            // Loop through each product in the subcategory
            for (let product of productData.Products[subcategory]) {
                // Add the product to the Firebase database
                await addProduct({
                    ...product,
                    category: category.Name,
                    subcategory: subcategory
                });
                console.log('Added product: ' + product.Name);
            }
        }
    }
    
    console.log('Finished loading data');
}

// Call the function to load data
loadData();
