import * as jwt_decode from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    // Adjust this depending on your token payload structure
    console.log("Decoded token:", decoded);
    return decoded.id || decoded.userId || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
