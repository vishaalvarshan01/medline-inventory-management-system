import React from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="mx-auto">
        <h1>Welcome to Medline Inventory Management</h1>
        <p>
          Manage your inventory, check stocks, create and assign issues here
        </p>
        <span className="text-red-500">Show pending issue,show which stocks are low or out of stock</span>

      </div>
    </div>
  );
};

export default Home;