import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-24 mb-20">{children}</div>;
};

export default MainLayout;
