import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadImageToFirebaseStorage } from "./config";

const uploadImageToFirebase = async (image: File): Promise<string> => {
  try {
    const imageRef = ref(uploadImageToFirebaseStorage, `images/${image.name}`);

    const snapshot = await uploadBytes(imageRef, image);

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;

  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw new Error("Image upload failed");
  }
};

export default uploadImageToFirebase;
