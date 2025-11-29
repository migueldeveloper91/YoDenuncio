// src/utils/uploadImage.ts
export async function uploadImage(file: File) {
  const formData = new FormData();
  const uploadPreset = "complaints";
  const cloudName = "dcgdlorbh";
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
}
