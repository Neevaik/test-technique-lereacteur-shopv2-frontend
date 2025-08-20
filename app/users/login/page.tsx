"use client";

import axios from "axios";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function loginAction(
  prevState: { message: string; success: boolean } | null,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post("http://localhost:4000/user/login", {
      email,
      password,
    });

    if (res.status !== 200) throw new Error("Erreur lors de la connexion");

    return {
      message: "✅ Connexion réussie",
      success: true,
      token: res.data.token,
      id: res.data._id,
    };
  } catch (err: unknown) {
    return {
      message: (err as any).response?.data?.message || (err as any).message,
      success: false,
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("id", state.id);
      router.push("/products");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <Link
        href="/"
        className="text-3xl font-bold text-gray-800 mb-8 hover:text-blue-600 transition"
      >
        ShopV2
      </Link>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Se connecter 🔑
        </h1>

        <form action={formAction} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
          >
            Connexion
          </button>
        </form>

        {state?.message && (
          <p
            className={`mt-4 text-center font-medium ${state.success ? "text-green-600" : "text-red-600"
              }`}
          >
            {state.message}
          </p>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">Pas encore de compte ?</p>
          <Link
            href="/users/signup"
            className="mt-2 inline-block bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
