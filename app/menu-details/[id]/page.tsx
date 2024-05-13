"use client";
import Image from "next/image";
import { v4 } from "uuid";
import { $orderDetail, addOrder } from "@/store/orderId";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $totalPrice, setTotalPrice } from "@/store/totalPrice";

interface ButtonValue {
  _id: string;
}

const MenuDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [menu, setMenu] = useState<{
    name: string;
    image: string;
    toppings: { _id: string; name: string; icon: string; price: number }[];
    price: number;
    description: string;
  }>({
    name: "",
    image: "",
    toppings: [],
    price: 0,
    description: "",
  });

  const oldOrder = useStore($orderDetail);

  const [inputValues, setInputValues] = useState<ButtonValue[]>([]);

  const handleInput = async (value: ButtonValue) => {
    setInputValues([...inputValues, value]);
  };

  const generateOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const uuid = v4();
    const id = "/order/" + today.split("/").join() + uuid;
    const order = { ...oldOrder };

    const newOrder: OrderValue = {
      customerName: "",
      orderNumber: id,
      menus: [
        {
          menu: params.id,
          toppings: [],
        },
      ],
    };

    for (let i = 0; i < inputValues.length; i++) {
      if (!newOrder.menus[0].toppings.includes(inputValues[i]._id)) {
        newOrder.menus[0].toppings.push(inputValues[i]._id);
      }
    }

    if (newOrder.menus.length > 0) {
      if (order.orderNumber == "") order.orderNumber = newOrder.orderNumber;
      order.menus.push(newOrder.menus[0]);

      addOrder(order);
      const menuId = order.menus.findLast((cur) => {
        return cur.menu;
      });

      const rawResponse = await fetch(`/api/menu/${menuId!.menu}`, {
        method: "GET",
      });

      const response = await rawResponse.json();

      if (response.success) {
        console.log("Hey");
        setTotalPrice(response.response.price + $totalPrice.get());
      } else {
        console.log("Can't fetch data!");
      }
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
              <div className="flex justify-between px-8 items-center">
                <Image
                  src={"/uploads/" + e.icon}
                  alt={e.name}
                  height="50"
                  width="50"
                ></Image>
                <button
                  className="btn btn-outline btn-success"
                  onClick={async () => await handleInput({ _id: e._id })}
                  type="button"
                >
                  ใส่{e.name}
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
