// Subir imágenes a Cloudinary
export async function uploadImages(files: File[]) {
  const urls: string[] = [];
  const cloudName = "dcgdlorbh";
  
  // Intentar sin preset (algunas cuentas permiten unsigned upload sin preset)
  // Si no funciona, debes crear un preset unsigned en Cloudinary
  const uploadPreset = ""; // Vacío para intentar sin preset

  console.log('📤 Iniciando upload de', files.length, 'archivos');

  for (const file of files) {
    try {
      console.log('📎 Procesando:', file.name, file.type, file.size);
      
      // Validar que sea una imagen válida
      if (!file.type.startsWith('image/')) {
        console.warn('⚠️ Saltando archivo no válido:', file.name);
        continue;
      }

      // Convertir archivo a base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      console.log('✅ Base64 generado, tamaño:', base64.length);

      // Subir usando la API de Cloudinary
      const formData = new FormData();
      formData.append("file", base64);
      if (uploadPreset) {
        formData.append("upload_preset", uploadPreset);
      }
      formData.append("folder", "complaints");

      console.log('🚀 Enviando a Cloudinary...');
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      console.log('📥 Respuesta recibida:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error de Cloudinary:', errorData);
        throw new Error(errorData.error?.message || `Error ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Upload exitoso:', data.secure_url);
      urls.push(data.secure_url);
      
    } catch (error) {
      console.error('❌ Error en upload:', error);
      throw new Error(`No se pudo subir ${file.name}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  if (urls.length === 0 && files.length > 0) {
    throw new Error("No se pudo subir ninguna imagen. Verifica que sean archivos de imagen válidos (JPG, PNG, etc.)");
  }

  console.log('✅ Upload completado:', urls.length, 'imágenes');
  return urls;
}
