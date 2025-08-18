"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Bienvenue dans notre ShopV2 🛍️
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Découvrez nos produits de qualité, ajoutez-les à votre panier et profitez d’une expérience d’achat simple et rapide.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/users/login" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition">
            Se connecter
          </Link>
          <Link href="/users/signup" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
            S'inscrire
          </Link>
          <Link href="/products" className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-700 transition">
            Voir les produits
          </Link>
        </div>
      </div>
    </div>
  );
}
