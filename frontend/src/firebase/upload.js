import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export const uploadImage = async (file) => {
    const storageRef = ref(storage, file.name);
    if (isValidHttpUrl(file.url)) {
        // console.log(`${file.url} is valid url`);
        return file.url;
    }

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