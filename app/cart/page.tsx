"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Votre panier 🛒</h1>

                {cart.length === 0 ? (
                    <p className="text-gray-600 text-center">Votre panier est vide.</p>
                ) : (
                    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
                        <ul className="divide-y divide-gray-200">
                            {cart.map((product) => (
                                <li key={product.id} className="flex justify-between items-center py-4">
                                    <div>
                                        <p className="font-medium text-gray-800">{product.name}</p>
                                        <p className="text-gray-500">Quantité : {product.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-gray-800">{product.price * product.quantity} €</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 flex justify-between items-center">
                            <p className="text-xl font-bold">Total : {totalPrice} €</p>
                            <Link
                                href="/payment"
                                className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
                            >
                                Passer au paiement
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
