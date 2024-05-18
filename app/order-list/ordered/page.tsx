"use client";
import React, { useEffect } from "react";
import Correct from "@/public/correct-success.svg";
import Image from "next/image";
import Link from "next/link";
import { $orderDetail } from "@/store/orderDetail.store";
const OrderedPage = () => {
  useEffect(() => {
    const emptyOrder: OrderDetails = { orderNumber: "", menus: [] };
    $orderDetail.set(emptyOrder);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Image src={Correct} alt="correct image" className="h-60 w-60"></Image>
      <div className="flex flex-col justify-center items-center gap-1">
        <h2 className="text-lg font-bold">
          ออเดอร์ของคุณกำลังดำเนินการ กรุณารอสักครู่
        </h2>
        <p>หากรอนานเกินกว่า 15 - 30 นาที</p>
        <p>โปรดแจ้งแม่ค้าเพื่อท้วงถามออเดอร์</p>
        <p>ขอบคุณที่ใช้บริการ 💓</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Link href="/" className="btn btn-info font-bold">
          กลับไปยังหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default OrderedPage;
