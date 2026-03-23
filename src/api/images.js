const API = import.meta.env.VITE_IMG_API;
const API_KEY = import.meta.env.VITE_IMG_API_KEY;

/**
 * Upload an image and get its url
 * @param {File} image - Image file to upload
 * @returns the url to the uploaded image
 */
export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("filename", image);

  const response = await fetch(API, {
    method: "POST",
    headers: { "x-magicapi-key": API_KEY },
    body: formData,
  });
  const { url } = await response.json();

  return url;
}
