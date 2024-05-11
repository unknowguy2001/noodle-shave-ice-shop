import React from "react";
import MenuForm from "../../_components/menuForm";

const EditMenu = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <h2 className="font-bold text-xl">หน้าแก้ไขเมนู</h2>
      </div>
      <MenuForm id={params.id}></MenuForm>
    </div>
  );
};

export default EditMenu;
