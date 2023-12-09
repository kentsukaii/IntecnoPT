// axiosConfig.js
import axios from 'axios';

axios.get('YOUR_API_ENDPOINT', {
  headers: {
    'X-API-KEY': 'YOUR_API_KEY',  // replace 'X-API-KEY' and 'YOUR_API_KEY' with your actual header name and API key
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
