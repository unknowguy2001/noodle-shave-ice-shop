import React from "react";
import Link from "next/link";
import MenuForm from "@/app/admin/menu/_components/menuForm";

const adminMenu = () => {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-bold text-xl">หน้าเพิ่มเมนู</h2>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <MenuForm></MenuForm>
      </div>
      <div className="flex justify-end">
        <Link href="/admin/manager" className="btn btn-error">
          ย้อนกลับ
        </Link>
      </div>
    </>
  );
};

export default adminMenu;
