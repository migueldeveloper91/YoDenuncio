import { storage } from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImages(files: File[]) {
  const urls: string[] = [];

  for (const file of files) {
    const fileRef = ref(storage, `complaints/${Date.now()}-${file.name}`);

    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    urls.push(url);
  }

  return urls;
}
