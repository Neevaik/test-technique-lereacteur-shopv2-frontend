"use client";

import { useState } from "react";
import Header from "../components/Header";

type Order = {
  _id: string;
  userEmail: string;
  delivered: boolean;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([
    { _id: "1", userEmail: "john@example.com", delivered: false },
    { _id: "2", userEmail: "sarah@example.com", delivered: false },
    { _id: "3", userEmail: "mike@example.com", delivered: true },
  ]);

  const validateOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, delivered: true } : o
      )
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
            Tableau de bord Admin 📦
          </h1>

          {orders.length === 0 ? (
            <p className="text-center text-gray-600">
              Aucune commande pour le moment.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-xl p-5 shadow-md flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">
                      Commande #{order._id}
                    </p>
                    <p className="text-gray-600">Utilisateur : {order.userEmail}</p>
                    <p className="text-gray-600">
                      Statut :{" "}
                      <span
                        className={`font-bold ${order.delivered ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {order.delivered ? "Livrée ✅" : "En attente ❌"}
                      </span>
                    </p>
                  </div>

                  {!order.delivered && (
                    <button
                      onClick={() => validateOrder(order._id)}
                      className="bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700 transition"
                    >
                      Valider
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
