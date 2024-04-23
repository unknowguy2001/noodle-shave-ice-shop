import React from "react";

const Card = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">ก๊วยเตี๋ยว</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions justify-end items-center">
          <button className="btn btn-outline btn-info">-</button>
          <span className="">5</span>
          <button className="btn btn-outline btn-info">+</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
