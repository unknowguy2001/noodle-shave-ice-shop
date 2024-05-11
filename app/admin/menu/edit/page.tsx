"use client";
import React, { useEffect, useState } from "react";
import EditForm from "@/components/edit-form";

const MenuList = () => {
  const [menus, setMenus] = useState<MenuValue[]>([
    {
      _id: "",
      name: "",
      image: "",
      toppings: [],
      price: 0,
      description: "",
    },
  ]);

  useEffect(() => {
    (async function () {
      const rawResponse = await fetch("/api/menu", {
        method: "GET",
      });

      const response = await rawResponse.json();
      if (response.success) {
        setMenus(response.menus);
      } else {
        console.log("can't get");
      }
    })();
  }, []);
  return (
    <div>
      <EditForm props={{ items: menus }}></EditForm>
    </div>
  );
};

export default MenuList;
