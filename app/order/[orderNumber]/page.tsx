import Image from "next/image";
import porkIcon from "@/public/pork.png";
const Order = ({ params }: { params: { orderNumber: string } }) => {
  return (
    <div className="h-screen">
      <img src="https://placehold.co/375x250" alt="Menu Image" />
      <div className="h-full">
        <div className="grid grid-cols-1 gap-2 pt-4">
          <div className="flex justify-between px-8 items-center">
            <Image src={porkIcon} alt="pork" width="50"></Image>
            <button className="btn btn-outline btn-success">ใส่หมูสับ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
