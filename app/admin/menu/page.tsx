import React from "react";
import Link from "next/link";
import MenuForm from "@/components/menuForm";

const adminMenu = () => {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-bold text-xl">หน้าเพิ่มเมนู</h2>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <MenuForm></MenuForm>
      </div>
    </>
  );
};

export default adminMenu;
