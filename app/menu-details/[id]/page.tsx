"use client";
import Image from "next/image";
import { v4 } from "uuid";
import { $orderDetail, addOrder } from "@/store/orderId";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MenuDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [menu, setMenu] = useState<{
    name: string;
    image: string;
    toppings: { name: string; icon: string; price: number }[];
    price: number;
    description: string;
  }>({
    name: "",
    image: "",
    toppings: [],
    price: 0,
    description: "",
  });

  const generateOrder = async () => {
    const oldOrder = $orderDetail.get();

    const today = new Date().toLocaleDateString();
    const uuid = v4();
    const id = "/order/" + today.split("/").join() + uuid;

    const newOrder: OrderValue = {
      customerName: "test1",
      orderNumber: id,
      menus: [
        [
          {
            menu: params.id,
            toppings: [{ toppings: "" }],
          },
        ],
      ],
    };

    if (oldOrder.orderNumber === "") {
      addOrder(newOrder);
    }

    if (newOrder.customerName !== oldOrder.customerName) {
      oldOrder.customerName = newOrder.customerName;
    }

    if (newOrder.menus[0].length != 0) {
      oldOrder.menus.push(newOrder.menus[0]);
    }

    addOrder(oldOrder);
  };

  const fecthMenuDetail = async () => {
    const response = await fetch(`/api/menu/${params.id}`);
    const menuDetial = await response.json();

    console.log(menuDetial);
    return menuDetial;
  };

  useEffect(() => {
    (async function () {
      const menuDetails = await fecthMenuDetail();

      setMenu(menuDetails);
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
          <div className="grid grid-cols-1 gap-2 pt-4">
            {menu.toppings.map((e) => (
              <div className="flex justify-between px-8 items-center">
                <Image
                  src={"/uploads/" + e.icon}
                  alt={e.name}
                  height="50"
                  width="50"
                ></Image>
                <button className="btn btn-outline btn-success">
                  ใส่{e.name}
                </button>
              </div>
            ))}
            <button
              className="btn btn-success"
              onClick={async () => {
                await generateOrder();
                router.push("/");
              }}
            >
              เพิ่มไปยังออเดอร์
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default MenuDetails;
