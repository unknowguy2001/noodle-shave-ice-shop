import React from "react";

const Card = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="pl-8">
        <img
          src="https://placehold.co/320x320"
          alt="Noodles"
          className="rounded"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">ก๊วยเตี๋ยว</h2>
        <p>ก๊วยเตี๋ยวแซ่บๆ ใส่หมูสับ ราคา: 30฿</p>
        <div className="card-actions justify-start items-center">
          <button className="btn btn-primary">เพิ่มออเดอร์</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
