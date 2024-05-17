"use client";
import Link from "next/link";
import { useStore } from "@nanostores/react";
import { $orderDetail, removeMenu } from "@/store/orderDetail.store";
import React, { useEffect, useState } from "react";
import { $totalPrice } from "@/store/totalPrice.store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";

const OrderList = () => {
  const orders = useStore($orderDetail);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const customerName = (e.target as HTMLFormElement).customerNameInput.value;

    const menus = orders.menus.map((item) => ({
      menu: item._id,
      toppings: item.selectedToppings.map((topping) => ({
        _id: topping._id,
      })),
    }));

    const response = await fetch("/api/order-list", {
      method: "POST",
      body: JSON.stringify({
        OrderValue: {
          orderNumber: orders.orderNumber,
          customerName,
          menus,
          totalPrice: $totalPrice.get(),
        },
      }),
    });
    const result = await response.json();

    if (result.success) {
      socket.emit("order", "created order");
      toast.success("คุณสั่งอาหารเรียบร้อยแล้ว กรุณารอแม่ค้าทำอาหารสักครู่...");
      router.push("/order-list/ordered");
    } else {
      toast.error("เกิดข้อผิดพลาดในการสั่งอาหาร กรุณาลองใหม่อีกครั้งในภายหลัง");
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div>
          <Link href="/" className="btn btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div className="pt-5 pl-5">
          <h2 className="font-semibold">รายการอาหาร</h2>
          <p className="mb-4">เลขที่รายการอาหาร: {orders.orderNumber}</p>
          <ul className="flex gap-3 flex-col overflow-auto h-[400px]">
            {orders.menus.map((item, index) => (
              <li
                key={item._id + index}
                className="flex justify-between items-center"
              >
                <div>
                  <p>{item.name}</p>
                  <div className="flex gap-2">
                    {item.selectedToppings.map((e) => (
                      <span
                        key={e._id + index}
                        className="badge badge-secondary"
                      >
                        {e.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/menu-details/${index}`}
                    className="btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                  >
                    แก้ไข
                  </Link>
                  <button
                    className="btn btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                    onClick={() => removeMenu(index)}
                  >
                    นำออก
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            className="input input-bordered input-primary w-full max-w-xs "
            type="text"
            placeholder="กรุณากรอกชื่อของคุณ"
            name="customerNameInput"
          />
          {orders.menus.length <= 0 ? (
            <button
              className="btn btn-disabled"
              role="button"
              aria-disabled="true"
            >
              ยืนยันออเดอร์
            </button>
          ) : (
            <button
              className="btn btn-success mt-2 btn-sm sm:btn-sm md:btn-md lg:btn-lg"
              type="submit"
            >
              ยืนยันออเดอร์ {$totalPrice.get()}฿
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default OrderList;
