import React from "react";

export const AdminGraph = () => {
  return (
    <div className="flex flex-col gap-8 border px-2 py-3 mx-2 rounded">
      <h2>กราฟแสดงยอดขายรายสัปดาห์</h2>
      <div></div>
      <div className="flex justify-end">
        <button className="btn btn-xs btn-info sm:btn-sm md:btn-md lg:btn-lg">
          ดูยอดขายรายเดือน 📈
        </button>
      </div>
    </div>
  );
};
