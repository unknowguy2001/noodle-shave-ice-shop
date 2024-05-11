"use client";
import { usePathname } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const ToppingForm = ({ id }: { id?: string }) => {
  const [toppingValue, setToppingValue] = useState<ToppingValue>({
    _id: "",
    name: "",
    icon: "",
    price: 0,
  });
  const path = usePathname();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    let name = (e.target as HTMLFormElement).nameInput.value;
    let price = (e.target as HTMLFormElement).priceInput.value;
    let file = (e.target as HTMLFormElement).fileUpload.files[0];

    const isEmptyInput = name && file;

    if (isEmptyInput && path == "/admin/topping") {
      formData.append("name", name);

      formData.append("file", file);

      if (price) {
        formData.append("price", price);
      }

      const response = await fetch("/api/topping", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Upload ok : " + result.name);
      } else {
        toast.error("Upload failed");
      }
    } else if (path === `/admin/topping/edit/${id}`) {
      if (!name) name = toppingValue.name;
      if (!price) price = toppingValue.price;

      if (!file) {
        const formData = new FormData();

        formData.append("name", name);
        if (price != undefined) {
          formData.append("price", price);
        }

        const response = await fetch(`/api/topping/${id}`, {
          method: "PATCH",
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          toast.success("Update Completed!");
        } else {
          toast.error("Update failed!");
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        if (price != undefined) {
          formData.append("price", price);
        }

        formData.append("file", file);

        const response = await fetch(`/api/topping/${id}`, {
          method: "PATCH",
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          toast.success("Update Completed!");
        } else {
          toast.error("Update failed!");
        }
      }
    }
  };

  useEffect(() => {
    if (path === `/admin/topping/edit/${id}`) {
      (async function () {
        const rawResponse = await fetch(`/api/topping/${id}`, {
          method: "GET",
        });

        const response = await rawResponse.json();

        if (response.success) {
          setToppingValue(response.response);
        }
      })();
    }
  }, [path]);
  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="name-input">ชื่อของท็อปปิ้ง</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="nameInput"
          defaultValue={toppingValue.name != "" ? toppingValue.name : ""}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="priceInput">ราคาของท็อปปิ้ง</label>
        <input
          type="number"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="priceInput"
          defaultValue={
            toppingValue.price !== 0 ? toppingValue.price?.toString() : ""
          }
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="file-upload">อัพโหลดรูปภาพไอคอนสำหรับท็อปปิ้ง</label>
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          name="fileUpload"
        />
      </div>
      <button type="submit" className="btn btn-success">
        {path != `/admin/topping/edit/${id}`
          ? "เพิ่มท็อปปิ้ง"
          : "แก้ไขท็อปปิ้ง"}
      </button>
    </form>
  );
};

export default ToppingForm;
