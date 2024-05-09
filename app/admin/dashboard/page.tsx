import React from "react";
import { AdminGraph } from "@/components/adminGraph";
import { AdminOrders } from "@/components/adminOrders";

const Dashboard = () => {
  return (
    <div className="h-full">
      <AdminGraph></AdminGraph>
      <AdminOrders></AdminOrders>
    </div>
  );
};

export default Dashboard;
