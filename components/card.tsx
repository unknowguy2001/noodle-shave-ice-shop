"use client";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [data, setData] = useState<
    { name: string; description: string; price: number; imgae: string }[]
  >([]);

  const fetchData = async () => {
    const response = await fetch("/api/menu");
    const products = await response.json();

    return products;
  };

  useEffect(() => {
    (async function () {
      const products = await fetchData();

      setData(products);
    })();
  }, []);

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      {data.map((product) => (
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
            <div className="card-actions justify-start items-center">
              <button className="btn btn-primary">เพิ่มออเดอร์</button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Card;
