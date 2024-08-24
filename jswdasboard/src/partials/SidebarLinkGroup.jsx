import React, { useState, useCallback } from "react";

function SidebarLinkGroup({ children, activecondition }) {
  // Initialize state with activecondition
  const [open, setOpen] = useState(activecondition);

  // Memoize the handleClick function to avoid unnecessary re-renders
  const handleClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        activecondition ? "bg-slate-900" : ""
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
