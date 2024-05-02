"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { v4 } from "uuid";

const Card = () => {
  const [menu, setMenu] = useState<
    { name: string; description: string; price: number; imgae: string }[]
  >([]);
  const [orderNumber, setOrderNumber] = useState("");

  const generateOrder = () => {
    const today = new Date().toLocaleDateString();
    const uuid = v4();
    const id = "/order/" + today.split("/").join() + uuid;
    setOrderNumber(id);
    console.log("counter");
    return `/order/${id}`;
  };

  const fetchData = async () => {
    const response = await fetch("/api/menu");
    const products = await response.json();

    return products;
  };

  useEffect(() => {
    (async function () {
      const products = await fetchData();

      setMenu(products);
    })();
  }, []);

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      {menu.map((product) => (
        <>
          <figure className="pl-8">
            <img
              src={product.imgae || "https://placehold.co/320x320"}
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
            <div className="card-actions justify-center items-center">
              <Link
                href={orderNumber == "" ? generateOrder() : orderNumber}
                className="btn btn-primary"
              >
                เพิ่มออเดอร์
              </Link>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Card;
