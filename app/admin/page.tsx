"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/admin/orders", {
          withCredentials: true
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        router.push("/"); 
      }
    };
    fetchOrders();
  }, []);

  const validateOrder = async (orderId: string) => {
    try {
      await axios.post(`http://localhost:4000/admin/orders/${orderId}/deliver`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, delivered: true } : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin - Commandes</h1>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded flex justify-between items-center">
          <div>
            <p><strong>Commande :</strong> {order._id}</p>
            <p><strong>Utilisateur :</strong> {order.userEmail}</p>
            <p><strong>Status :</strong> {order.delivered ? "Livrée ✅" : "En attente ❌"}</p>
          </div>
          {!order.delivered && (
            <button
              onClick={() => validateOrder(order._id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Valider la livraison
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
