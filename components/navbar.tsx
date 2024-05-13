"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@nanostores/react";
import { $orderDetail } from "@/store/orderId";
import { $totalPrice } from "@/store/totalPrice";

const Navbar = () => {
  const orders = useStore($orderDetail);
  const totalPrice = useStore($totalPrice);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const urlToFetch = "/api/auth/logout";

    const response = await fetch(urlToFetch, {
      method: "POST",
    });

    if (response.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          🍜 เตี๋ยว-เตี๋ยว
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {pathname == "/admin/dashboard" || pathname == "/admin/manager" ? (
            <>
              <div className="flex gap-2">
                {pathname != "/admin/manager" ? (
                  <Link href="/admin/manager" className="btn btn-xs btn-info">
                    การจัดการ
                  </Link>
                ) : null}
                <button onClick={() => logout()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                </button>
              </div>
            </>
          ) : pathname != "/login" ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {orders.menus.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {orders.menus.length} รายการ
                  </span>
                  <span className="text-info">
                    ยอดเงินที่ต้องชำระ: ฿{totalPrice.toString()}
                  </span>
                  <div className="card-actions">
                    <Link
                      href="/order-list"
                      className="btn btn-primary btn-block"
                    >
                      ดูรายการอาหารที่สั่งไว้
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
