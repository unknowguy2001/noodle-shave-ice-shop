"use client";
import React, { useEffect, useState } from "react";
import EditForm from "../../../../components/edit-form";

const ToppingList = () => {
  const [toppings, setToppings] = useState<ToppingValue[]>([
    {
      _id: "",
      name: "",
      icon: "",
      price: 0,
    },
  ]);

  useEffect(() => {
    (async function () {
      const rawResponse = await fetch("/api/topping", { method: "GET" });

      const response = await rawResponse.json();

      if (response.success) {
        setToppings(response.toppings);
      } else {
        console.log("can't get");
      }
    })();
  }, []);

  return (
    <div>
      <EditForm props={{ items: toppings }}></EditForm>
    </div>
  );
};

export default ToppingList;
