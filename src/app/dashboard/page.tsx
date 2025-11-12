import React, { Suspense } from "react";
import Dashboard from "./Dashboard";
import UseAuth from "../customHooks/UseAuth";

const page = () => {
  return (
    <UseAuth>
      <Suspense>
        <Dashboard />
      </Suspense>
    </UseAuth>
  );
};

export default page;
