import React from "react";

export const AdminOrders = () => {
  return (
    <div className="flex flex-col border gap-2 mt-4 mx-2 px-2 py-3 rounded h-[60%] ">
      <h2>รายการอาหารของลูกค้า</h2>
      <div className="flex justify-between items-center overflow-auto">
        <div>
          <h3>ชื่อ: คุณต๋อย</h3>
        </div>
        <div className="flex gap-3 overflow-hidden items-center">
          <button className="btn btn-xs btn-info sm:btn-sm md:btn-md lg:btn-lg">
            ดูรายละเอียด
          </button>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
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
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
