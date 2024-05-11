"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Card = () => {
  const [menu, setMenu] = useState<MenuValue[]>([
    {
      _id: "",
      name: "",
      image: "",
      toppings: [],
      price: 0,
      description: "",
    },
  ]);

  const fetchData = async () => {
    const response = await fetch("/api/menu");
    const products = await response.json();

    return products;
  };

  useEffect(() => {
    (async function () {
      const products = await fetchData();

      setMenu(products.menus);
    })();
  }, []);
  console.log(menu);
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
              ราคา: <span>{product.price.toString()}฿</span>
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
