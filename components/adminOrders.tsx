import React from "react";

export const AdminOrders = () => {
  return (
    <div className="flex flex-col border gap-2 mt-4 mx-2 px-2 py-3 rounded h-[60%] ">
      <h2>รายการอาหารของลูกค้า</h2>
      <div className="flex justify-between items-center overflow-auto">
        <div>
          <h3>ชื่อ: คุณต๋อย</h3>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-xs btn-info sm:btn-sm md:btn-md lg:btn-lg">
            ดูรายละเอียด
          </button>
          <button className="btn btn-xs btn-success sm:btn-sm md:btn-md lg:btn-lg">
            เสร็จสิ้นออเดอร์
          </button>
        </div>
      </div>
    </div>
  );
};
