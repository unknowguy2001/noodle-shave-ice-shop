import React from "react";
import ToppingForm from "../../_components/toppingForm";

const EditTopping = ({ params }: { params: { id: string } }) => {
  //! fetch topping
  return (
    <div>
      <ToppingForm id={params.id}></ToppingForm>
    </div>
  );
};

export default EditTopping;
