import url from "url";

export const removePath = (fullUrl = "") => {
  // Parsing the URL using the 'url' module
  const parsedUrl = url.parse(fullUrl);
  let path = parsedUrl.pathname; // Extracts "/static/images/example.png"

  // Remove the leading slash if it exists
  if (path.startsWith("/")) {
    path = path.replace(/^\/+/, "");
  }
  // Remove any file extension (e.g., .png, .jpg, .jpeg, .gif, etc.)
  return path.replace(/\.[^/.]+$/, "");
};
