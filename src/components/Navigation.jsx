import React, { useState } from "react";
import SideNavigation from "./Side-Navigation";

function Navigation() {
  const [status, setStatus] = useState(false);
  return (
    <div className="h-10 bg-red-100">
      <SideNavigation />
      <i class="bi bi-list"></i>
    </div>
  );
}

export default Navigation;
