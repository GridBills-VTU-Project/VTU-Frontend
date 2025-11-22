import React, { Suspense } from "react";
import Dashboard from "./Dashboard";
import UseAuth from "../customHooks/UseAuth";
import { NormalLoadingScreen } from "../loading";

const page = () => {
  return (
    <UseAuth>
      <Suspense fallback={<NormalLoadingScreen/>}>
        <Dashboard />
      </Suspense>
    </UseAuth>
  );
};

export default page;
