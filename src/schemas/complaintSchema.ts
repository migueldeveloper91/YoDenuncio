import { z } from "zod";

export const complaintSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z.string().min(10, "La descripción es muy corta"),
  categoria: z.string().min(1, "Selecciona una categoría"),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  images: z.array(z.any()).optional(),
});

export type ComplaintForm = z.infer<typeof complaintSchema>;
