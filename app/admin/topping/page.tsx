import ToppingForm from "@/app/admin/topping/_components/toppingForm";
import React from "react";
import Link from "next/link";

const Topping = () => {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-bold text-xl">หน้าเพิ่มท็อปปิ้ง</h2>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <ToppingForm></ToppingForm>
      </div>
      <div className="flex justify-end">
        <Link href="/topping/edit" className="btn btn-warning">
          แก้ไขท็อปปิ้ง
        </Link>
      </div>
    </>
  );
};

export default Topping;
