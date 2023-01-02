import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (file) => {
    const storageRef = ref(storage, file.name);

    let url = '';
    await uploadBytes(storageRef, file.file).then((snapshot) => {
        // console.log('Uploaded a blob or file!');
    });
    await getDownloadURL(storageRef).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        url = downloadURL;
    });
    return url;
}