export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const uploadPreset = "complaints";
    const cloudName = "dcgdlorbh";

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`Error al subir la imagen: ${res.statusText}`);
      }

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Cloudinary no devolvió la URL de la imagen");
      }

      return data.secure_url;
    });

    const urls = await Promise.all(uploadPromises);
    console.log("URLS", urls);

    return urls;
  } catch (error) {
    console.error("Error subiendo imágenes:", error);
    throw error;
  }
}
