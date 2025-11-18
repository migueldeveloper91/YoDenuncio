/**
 * Genera una URL de Cloudinary con transformaciones optimizadas
 * @param url URL original de Cloudinary
 * @param options Opciones de transformación
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'jpg' | 'png' | 'webp';
  } = {}
): string {
  const { width, height, quality = 'auto', format = 'auto' } = options;

  // Validar que sea una URL de Cloudinary
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  // Construir las transformaciones
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  // Si hay transformaciones, insertarlas en la URL
  if (transformations.length > 0) {
    const transformation = transformations.join(',');
    // Insertar después de /upload/
    return url.replace('/upload/', `/upload/${transformation}/`);
  }

  return url;
}

/**
 * Genera una URL optimizada para thumbnails (miniaturas)
 */
export function getThumbnailUrl(url: string): string {
  return getOptimizedCloudinaryUrl(url, {
    width: 300,
    height: 300,
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Genera una URL optimizada para vista completa
 */
export function getFullImageUrl(url: string): string {
  return getOptimizedCloudinaryUrl(url, {
    width: 1200,
    quality: 'auto',
    format: 'auto',
  });
}
