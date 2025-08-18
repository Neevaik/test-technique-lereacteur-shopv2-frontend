"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function PaymentPage() {
    const [cartItems] = useState([
        { id: 1, name: "Produit A", quantity: 2, price: 25 },
        { id: 2, name: "Produit B", quantity: 1, price: 40 },
    ]);

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handlePayment = () => {
        alert("Paiement confirmé ! 🎉");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 p-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Paiement 💳</h1>

                <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Résumé du panier</h2>
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="py-2 flex justify-between">
                                <span>
                                    {item.name} x{item.quantity}
                                </span>
                                <span>{item.price * item.quantity} €</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between font-bold text-lg mb-6">
                        <span>Total :</span>
                        <span>{totalPrice} €</span>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
                    >
                        Confirmer le paiement
                    </button>
                </div>
            </div>
        </>
    );
}
