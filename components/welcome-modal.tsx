import Link from "next/link";
import React from "react";

const WelcomeModal = () => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg flex gap-2 items-center">
          แจ้งเตือน
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-info"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </h3>
        <p className="py-4 text-white">
          โปรดทราบ เว็บแอปพลิเคชันนี้
          ใช้ได้เฉพาะภายในบริเวณพื้นที่ร้านเท่านั้นหากจะใช้งาน
          กรุณาเดินทางไปยังร้านอาหารก่อนใช้บริการ
        </p>
        <div className=" flex justify-end">
          <Link
            className="btn btn-info btn-sm"
            href="https://maps.app.goo.gl/zUR6nK71bkGswz8dA"
            target="_blank"
          >
            แผนที่ร้าน 🗺️
          </Link>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-error">ปิดหน้าต่าง</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default WelcomeModal;
