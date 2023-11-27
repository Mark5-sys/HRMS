let API;
let IMAGE_URL;

if (process.env.NODE_ENV === "production") {
  // Use production API and IMAGE_URL
  API = "https://seal-app-sq4gf.ondigitalocean.app/api";
  IMAGE_URL = "https://seal-app-sq4gf.ondigitalocean.app/images";
} else {
  // Use development API and IMAGE_URL
  API = "http://localhost:8000/api";
  IMAGE_URL = "http://127.0.0.1:8000/images";
}

export { API, IMAGE_URL };
