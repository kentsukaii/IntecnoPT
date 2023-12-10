// Import the necessary Firestore modules
import { collection, addDoc, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";
import { firestore, storage } from "../firebase"; // Import the already initialized Firestore and Storage
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";


console.log("Load imports from firebaseAPI.js")

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
    const q = query(collection(firestore, 'Products'), where('Name', '==', product.Name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log('Product ' + product.Name + ' already exists in the database.');
      return;
    }
    const productRef = doc(collection(firestore, 'Products'));
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
      SalePercentage: product.SalePercentage // new field
    }).catch(error => {
      console.error('Error writing to database: ', error);
    });
}


export { addProduct };

  
  