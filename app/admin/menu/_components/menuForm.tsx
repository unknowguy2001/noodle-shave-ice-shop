"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const MenuForm = ({ id }: { id?: string }) => {
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState<MenuValue>({
    _id: "",
    name: "",
    description: "",
    image: "",
    price: 0,
    toppings: [],
  });

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

    let name = (e.target as HTMLFormElement).nameInput.value;
    let description = (e.target as HTMLFormElement).descriptionInput.value;
    let price = (e.target as HTMLFormElement).priceInput.value;
    let file = (e.target as HTMLFormElement).fileUpload.files[0];

    const isEmptyInput = name && description && price && file;
    if (isEmptyInput && path == "/admin/menu") {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("toppings", JSON.stringify(selectedCheckbox));
      formData.append("file", file);

      const response = await fetch("/api/menu", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Upload ok : " + result.name);
        router.refresh();
      } else {
        toast.error("Upload failed");
        router.refresh();
      }
    }

    if (path == `/admin/menu/edit/${id}`) {
      const formData = new FormData();
      if (!name) name = menu.name;
      if (!description) description = menu.description;
      if (!price) price = menu.price;
      if (selectedCheckbox.length != 0) {
        formData.append("toppings", JSON.stringify(selectedCheckbox));
      } else {
        formData.append(
          "toppings",
          JSON.stringify(menu.toppings.map((topping) => topping.id))
        );
      }

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      if (file) formData.append("file", file);

      const rawResponse = await fetch(`/api/menu/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const response = await rawResponse.json();

      if (response.success) {
        toast.success("อัพเดทข้อมูลสำเร็จ");
        router.refresh();
      } else {
        toast.error("อัพเดทข้อมูลไม่สำเร็จ โปรดลองอีกครั้งในภายหลัง");
        router.refresh();
      }
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

      setToppings(ToppingDetail.toppings);

      if (path == `/admin/menu/edit/${id}`) {
        (async function () {
          const rawResponse = await fetch(`/api/menu/${id}`, {
            method: "GET",
          });

          const response = await rawResponse.json();

          if (response.success) {
            setMenu(response.response);
          } else {
            toast.error("ไม่สามารถดึงข้อมูลเมนูที่คุณต้องการได้");
          }
        })();
      }
    })();
  }, []);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedCheckbox([...selectedCheckbox, value]);
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
          defaultValue={menu.name != "" ? menu.name : ""}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <label htmlFor="descriptionInput">รายละเอียดเมนู</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="descriptionInput"
          defaultValue={menu.description != "" ? menu.description : ""}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="priceInput">ราคา</label>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="priceInput"
          defaultValue={menu.price != 0 ? menu.price.toString() : ""}
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
              defaultChecked={
                path == "/admin/menu"
                  ? selectedCheckbox.includes(e._id)
                  : menu.toppings
                      .map((topping) => topping.name == e.name)
                      .every((value) => value)
              }
              onChange={handleCheckboxChange}
            />
            <div></div>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-success">
        {path == "/admin/menu" ? "เพิ่มเมนู" : "อัพเดทเมนู"}
      </button>
    </form>
  );
};

export default MenuForm;
