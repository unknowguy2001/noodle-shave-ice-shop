"use client";
import Link from "next/link";
import { useStore } from "@nanostores/react";
import { $orderDetail, removeMenu } from "@/store/orderId";

const OrderList = () => {
  const orders = useStore($orderDetail);

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
          <ul className="flex gap-3 flex-col">
            {orders.menus.map((item, index) => (
              <li
                key={item._id + index}
                className="flex justify-between items-center"
              >
                <div>
                  <p>{item.name}</p>
                  {item.selectedToppings.map((e) => (
                    <span key={e._id + index} className="badge badge-secondary">
                      {e.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-warning">แก้ไข</button>
                  <button
                    className="btn btn-error"
                    onClick={() => removeMenu(index)}
                  >
                    นำออก
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderList;
