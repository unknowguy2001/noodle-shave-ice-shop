"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

// interface MyEventTarget extends EventTarget {
//   files: {};
//   file: {};
// }

const ToppingForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Object.values(e.target.files).forEach((file) => {
        setSelectedFile(file);
      });
    }
  };
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile && name) {
      formData.append("file", selectedFile);
      formData.append("toppingName", name);

      // * implement Fecth
      const response = await fetch("/api/topping/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Upload ok : " + result.name);
      } else {
        toast.error("Upload failed");
      }
    }
  };
  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="name-input">ชื่อของท็อปปิ้ง</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info input-md w-full max-w-xs"
          name="name-input"
          onChange={handleName}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="file-upload">อัพโหลดรูปภาพไอคอนสำหรับท็อปปิ้ง</label>
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          name="file-upload"
          onChange={handleFile}
        />
      </div>
      <button type="submit" className="btn btn-success">
        เพิ่มท็อปปิ้ง
      </button>
    </form>
  );
};

export default ToppingForm;
