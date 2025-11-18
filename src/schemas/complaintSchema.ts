import { z } from "zod";

export const complaintSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z.string().min(10, "La descripción es obligatoria"),
  categoria: z.string().min(1, "Debe seleccionar una categoría"),

  images: z.array(z.any()).optional(),
  lat: z.number().refine((v) => v !== undefined, {
    message: "La ubicación es obligatoria",
  }),
  lng: z.number().refine((v) => v !== undefined, {
    message: "La ubicación es obligatoria",
  }),
});

export type ComplaintForm = z.infer<typeof complaintSchema>;
