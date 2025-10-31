import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { zodResolver } from "@hookform/resolvers/zod";
import { IonContent, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Esquema de validación con Zod
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Nombre inválido"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    console.log("Datos de registro:", data);
    // Aquí puedes llamar a Firebase Authentication para crear usuario
    // ejemplo:
    // createUserWithEmailAndPassword(auth, data.email, data.password)
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="flex items-center justify-center bg-gray-100"
      >
        <div className="flex flex-col justify-center items-center min-h-screen w-full">
          <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Regístrate
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                {...register("fullName")}
                error={errors.fullName?.message}
              />
              <Input
                label="Correo electrónico"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Contraseña"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <Button type="submit" label="Crear cuenta" />

              <p className="text-sm text-center text-gray-500 mt-4">
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="text-blue-600 font-semibold">
                  Inicia sesión
                </a>
              </p>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
