import React from "react";
import { AdminGraph } from "@/app/admin/dashboard/_components/adminGraph";
import { AdminOrders } from "@/app/admin/dashboard/_components/adminOrders";

const Dashboard = () => {
  return (
    <div className="h-full">
      <AdminGraph></AdminGraph>
      <AdminOrders></AdminOrders>
    </div>
  );
};

export default Dashboard;
