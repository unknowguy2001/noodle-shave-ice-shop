"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const EditForm = ({
  props,
}: {
  props: { items: ToppingValue[] | MenuValue[] };
}) => {
  const path = usePathname();
  return (
    <div>
      <div className="flex justify-end">
        <Link href="/admin/manager" className="btn btn-circle btn-sm mb-3 mx-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      <h2 className="text-lg font-semibold mx-7">
        รายชื่อ{path == "/admin/menu/edit" ? "เมนู" : "ท็อปปิ้ง"}
      </h2>

      {props.items.map((item) => (
        <div key={item.name}>
          <ul className="mt-3">
            <li className="flex justify-between items-center mx-7 ">
              {item.name}
              <div className="flex gap-2">
                <Link
                  href={
                    path == "/admin/menu/edit"
                      ? path + `/${item._id}`
                      : path + `/${item._id}`
                  }
                  className="btn btn-warning"
                >
                  แก้ไข
                </Link>
                <button className="btn btn-error">ลบ</button>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EditForm;
