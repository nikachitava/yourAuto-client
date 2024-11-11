import { deleteObject, ref } from "firebase/storage"
import { storage } from "./config"

export const deleteImage = async (imagePath: string) => {
    const imageRef = ref(storage, imagePath)

    try {
        await deleteObject(imageRef)
        console.log("Image deleted successfulyy")
    } catch (error) {
        console.error("Error deleting image", error)
    }
}