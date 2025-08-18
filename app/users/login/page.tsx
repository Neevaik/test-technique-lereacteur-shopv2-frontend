"use client";
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
