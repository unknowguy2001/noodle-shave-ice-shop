"use client";

import { socket } from "@/socket";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export const AdminOrders = () => {
  const [recieveOrders, setRecieveOrders] = useState<OrderValue[]>();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
      socket.on("data", (data) => {
        setRecieveOrders(data);
      });
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    try {
      (async function () {
        const data = await fetch("/api/order-list");

        const response = await data.json();
        if (response) {
          console.log(response);
          setRecieveOrders(response);
        }
      })();
    } catch (error) {
      console.log("an error happended!");
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleOrder = (val: string, _id: string, type: string) => {
    const copyRecieveOrders: OrderValue[] = [...recieveOrders!];

    (async function () {
      const rawResponse = await fetch(`/api/order-list/${_id}`, {
        method: type == "correct" ? "PATCH" : "DELETE",
      });

      const response = await rawResponse.json();

      if (response.success) {
        type == "correct"
          ? toast.success("จัดการออเดอร์เสร็จสิ้น!")
          : toast.success("นำออเดอร์ออกสร็จสิ้น!");
      } else {
        type == "correct"
          ? toast.error(
              "ไม่สามารถจัดการออเดอร์ได้ โปรดลองใหม่อีกครั้งในภายหลัง"
            )
          : toast.error(
              "ไม่สามารถนำออเดอร์ออกได้ โปรดลองใหม่อีกครั้งในภายหลัง"
            );
      }
    })();

    const newOrder = copyRecieveOrders.filter((value) => {
      return value.orderNumber != val;
    });

    setRecieveOrders(newOrder);
  };
  return (
    <>
      <div className="flex flex-col border gap-2 mt-4 mx-2 px-2 py-3 rounded h-[60%] ">
        <h2>รายการอาหารของลูกค้า</h2>
        {recieveOrders?.map((item) => (
          <div
            key={item.orderNumber}
            className="flex justify-between items-center overflow-auto border p-2"
          >
            <div>
              <h3>ชื่อ: {item.customerName}</h3>
              <span className="badge badge-primary badge-outline">
                {item.totalPrice} ฿
              </span>
            </div>
            <div className="flex gap-3 overflow-hidden items-center">
              <button className="btn btn-xs btn-info sm:btn-sm md:btn-md lg:btn-lg">
                ดูรายละเอียด
              </button>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                onClick={() =>
                  handleOrder(item.orderNumber, item._id, "correct")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="green"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-x"
                  onClick={() =>
                    handleOrder(item.orderNumber, item._id, "remove")
                  }
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
