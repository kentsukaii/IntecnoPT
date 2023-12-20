// Import the necessary modules and functions
import { addProduct, getTopSellingProducts } from '../firebaseAPI';
import productData from './products.json';

console.log('Successfully imported addProduct, getTopSellingProducts and productData');

// Function to load data into the database
async function loadData() {
    console.log('Starting to load data...');
    
    // Loop through each category in productData.Products
    for (let categoryKey in productData.Products) {
        // Loop through each subcategory in the category
        for (let subcategoryKey in productData.Products[categoryKey]) {
            // Loop through each product in the subcategory
            for (let product of productData.Products[categoryKey][subcategoryKey]) {
                // Add the Category and Subcategory fields to the product object
                product.Category = categoryKey;
                product.Subcategory = subcategoryKey;
                // Add the product to the Firebase database
                await addProduct(product);
                console.log('Added product: ' + product.Name);
            }
        }
    }


    
    console.log('Finished loading data');
}

// Export the function so it can be used elsewhere
export { loadData };
