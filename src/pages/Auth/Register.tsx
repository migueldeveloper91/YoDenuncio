import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { registerUser } from "@/services/firebaseAuth";

import { zodResolver } from "@hookform/resolvers/zod";
import { IonContent, IonImg, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
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
  const history = useHistory();

  const onSubmit = async (data: RegisterData) => {
    try {
      const user = await registerUser(data.email, data.password, data.fullName);
      console.log("Usuario registrado:", user);
      alert("Registro exitoso ✅");
      history.push("/tabs"); // 👈 redirige a Home
    } catch (error: any) {
      console.error(error);
      alert("Error al registrarse: " + error.message);
    }
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
            <IonImg
              src="./src/assets/images/Logo.png"
              alt="Logo YoDenuncio"
              className="mx-auto mb-12 w-36 h-36 object-contain"
            />
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
