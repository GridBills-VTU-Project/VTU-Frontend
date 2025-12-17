'use client';
import React from "react";
import { useAuthUser } from "../customHooks/UseQueries";
import { NormalLoadingScreen } from "../loading";
import AdminWallet from "./admin/AdminWallet";
import UserWallet from "./UserWallet";
import AgentWallet from "./agent/AgentWallet";

const MainWallet = () => {
    const { data:user} = useAuthUser();

    if(!user) {
      return <NormalLoadingScreen/>
    }
    if(user.role == "Admin"){
      return <AdminWallet/>
    }else if (user.role == "Agent"){
      return <AgentWallet/>
    }else{
      return <UserWallet/>

    }
};

export default MainWallet;
