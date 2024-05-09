"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@nanostores/react";
import { $orderDetail } from "@/store/orderId";

const Card = () => {
  const testOrder = useStore($orderDetail);
  const [menu, setMenu] = useState<
    {
      _id: string;
      name: string;
      description: string;
      price: number;
      image: string;
    }[]
  >([]);

  const fetchData = async () => {
    const response = await fetch("/api/menu");
    const products = await response.json();
    console.log(testOrder);

    return products;
  };

  useEffect(() => {
    (async function () {
      const products = await fetchData();

      setMenu(products);
    })();
  }, []);

  return (
    <div className="flex flex-col overflow-auto">
      {menu.map((product) => (
        <div key={product._id}>
          <figure className="px-8">
            <img
              src={
                "/uploads/" + product.image || "https://placehold.co/320x320"
              }
              alt={product.name}
              className="rounded"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.description}</p>
            <p>
              ราคา: <span>{product.price}฿</span>
            </p>
            <div className="card-actions justify-end items-center">
              <Link
                href={`/menu-details/${product._id}`}
                className="btn btn-primary"
              >
                เพิ่มออเดอร์
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
