"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface MyEventTarget extends EventTarget {
  name: string;
  value: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInput = async (e: React.FormEvent) => {
    const target = e.target as MyEventTarget;

    setData({
      ...data,
      [target.name]: target.value,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlToFetch = "/api/auth/login";

    let response = await fetch(urlToFetch, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (response.ok) {
      router.push("/dashboard");
      console.log("ok");
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[calc(100dvh-72px)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            onChange={handleInput}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="*******"
            name="password"
            onChange={handleInput}
          />
        </label>
        <button
          className="btn btn-xs btn-primary sm:btn-sm md:btn-md lg:btn-lg"
          type="submit"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};
