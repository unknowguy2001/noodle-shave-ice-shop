"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";

const MenuForm = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);
  const [toppings, setToppings] = useState<
    {
      _id: string;
      name: string;
      icon: string;
    }[]
  >([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const router = useRouter();
    const formData = new FormData();

    const name = (e.target as HTMLFormElement).nameInput.value;
    const description = (e.target as HTMLFormElement).descriptionInput.value;
    const price = (e.target as HTMLFormElement).priceInput.value;
    const file = (e.target as HTMLFormElement).fileUpload.files[0];

    const isEmptyInput = name && description && price && file;
    if (isEmptyInput) {
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("toppings", JSON.stringify(selectedCheckbox));
      formData.append("file", file);
    }

    const response = await fetch("/api/menu", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Upload ok : " + result.name);
      router.reload();
    } else {
      toast.error("Upload failed");
      router.reload();
    }
  };

  const fetchTopping = async () => {
    const response = await fetch("/api/topping", {
      method: "GET",
    });

    const ToppingDetail = await response.json();

    return ToppingDetail;
  };

  useEffect(() => {
    (async function () {
      const ToppingDetail = await fetchTopping();

      setToppings(ToppingDetail);
    })();
  }, []);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCheckbox([...selectedCheckbox, value]);
      console.log(value);
    } else {
      setSelectedCheckbox(selectedCheckbox.filter((item) => item !== value));
    }
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="nameInput">ชื่อของเมนู</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="nameInput"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <label htmlFor="descriptionInput">รายละเอียดเมนู</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="descriptionInput"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="priceInput">ราคา</label>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="priceInput"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="fileUpload">อัพโหลดรูปภาพเมนู</label>
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          name="fileUpload"
        />
      </div>
      <div className="flex  items-center gap-2">
        {toppings.map((e) => (
          <div key={e._id}>
            <label htmlFor={e.name}>{e.name}</label>
            <input
              type="checkbox"
              name={e.name}
              value={e._id}
              checked={selectedCheckbox.includes(e._id)}
              onChange={handleCheckboxChange}
            />
            <div></div>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-success">
        เพิ่มเมนู
      </button>
    </form>
  );
};

export default MenuForm;
