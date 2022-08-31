import React from "react";
import Navigation from "../../components/Navigation";
import AdminLayout from "../../layout/AdminLayout";

function Level1() {
  return (
    <AdminLayout>
      <div className="w-full h-screen bg-gray-100">
        <Navigation />
        <div>level1</div>
        </div>
    </AdminLayout>
  );
}

export default Level1;
