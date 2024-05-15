"use client";
import Image from "next/image";
import { v4 } from "uuid";
import { $orderDetail, addOrder } from "@/store/orderId";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $totalPrice, setTotalPrice } from "@/store/totalPrice";

const MenuDetails = ({ params }: { params: { id: string } }) => {
  const [menu, setMenu] = useState<{
    _id: string;
    name: string;
    image: string;
    toppings: { _id: string; name: string; icon: string; price: number }[];
    price: number;
    description: string;
  }>({
    _id: "",
    name: "",
    image: "",
    toppings: [],
    price: 0,
    description: "",
  });

  const oldOrder = useStore($orderDetail);

  const [toppingValues, setToppingValues] = useState<
    {
      _id: string;
      name: string;
      price: number;
    }[]
  >([]);

  const isDuplicateInputValues = (value: {
    _id: string;
    name: string;
    price: number;
  }) => {
    const index = toppingValues.findIndex((val) => {
      return val._id == value._id;
    });
    return index;
  };

  const handleTopping = async (value: {
    _id: string;
    name: string;
    price: number;
  }) => {
    const index = isDuplicateInputValues(value);

    if (index != -1) {
      const temp = [...toppingValues];
      temp.splice(index, 1);

      setToppingValues(temp);
      return;
    }
    setToppingValues([...toppingValues, value]);
  };

  const generateOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const uuid = v4();
    const id = "/order/" + today.split("/").join() + uuid;
    const order = { ...oldOrder };

    const newOrder: OrderDetails = {
      orderNumber: id,
      menus: [
        {
          _id: menu._id,
          name: menu.name,
          price: menu.price,
          selectedToppings: toppingValues,
        },
      ],
    };

    for (let i = 0; i < toppingValues.length; i++) {}

    if (newOrder.menus.length > 0) {
      if (order.orderNumber == "") order.orderNumber = newOrder.orderNumber;
      order.menus.push(newOrder.menus[0]);

      addOrder(order);

      setTotalPrice(newOrder.menus[0].price + $totalPrice.get());
    }
    return;
  };

  const fecthMenuDetail = async () => {
    const response = await fetch(`/api/menu/${params.id}`);
    const menuDetial = await response.json();

    return menuDetial;
  };

  useEffect(() => {
    (async function () {
      const menuDetails = await fecthMenuDetail();

      setMenu(menuDetails.response);
    })();
  }, []);

  return (
    <div className="h-screen">
      <>
        <img
          src={"/uploads/" + menu.image || "https://placehold.co/375x250"}
          alt={menu.description}
        />
        <div className="h-full">
          <div className="my-2 pl-2 flex flex-col gap-1">
            <h2 className="text-xl font-bold">{menu.name}</h2>
            <p>{menu.description}</p>
            <div className="flex justify-end px-2">
              <p className="font-semibold">{menu.price}฿</p>
            </div>
          </div>
          <form
            className="grid grid-cols-1 gap-2 pt-4"
            onSubmit={generateOrder}
          >
            {menu.toppings.map((e) => (
              <div
                key={e._id}
                className="flex justify-between px-8 items-center"
              >
                <Image
                  src={"/uploads/" + e.icon}
                  alt={e.name}
                  height="50"
                  width="50"
                ></Image>
                <button
                  className={
                    isDuplicateInputValues(e) != -1
                      ? "btn btn-outline btn-error"
                      : "btn btn-outline btn-success"
                  }
                  onClick={async () => await handleTopping(e)}
                  type="button"
                >
                  {isDuplicateInputValues(e) != -1 ? "ไม่ใส่" : "ใส่"}
                  {e.name}
                </button>
              </div>
            ))}
            <button className="btn btn-success" type="submit">
              เพิ่มไปยังออเดอร์
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default MenuDetails;
