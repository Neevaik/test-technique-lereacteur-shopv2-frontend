"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-50 shadow-md p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
      >
        ShopV2
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/cart"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Panier
        </Link>

        <Link
          href="/products"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Produits
        </Link>

        <Link
          href="/payment"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Paiement
        </Link>

        <Link
          href="/users/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Se connecter
        </Link>
        <Link
          href="/users/signup"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Créer un compte
        </Link>
      </div>
    </header>
  );
}
