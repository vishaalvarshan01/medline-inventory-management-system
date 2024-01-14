import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import supabase from "../supabaseClient";

const LINKS = ["inventory", "issues", "reports", "settings"];

const Sidebar = () => {
  const navigate = useNavigate();

  const deleteAuthTokenCookies = () => {
    // Get all cookies
    const cookies = document.cookie.split("; ");

    // Loop through cookies and remove "authToken" cookies
    cookies.forEach((cookie) => {
      const [name] = cookie.split("=");
      if (name.trim().startsWith("authToken")) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None`;
      }
    });
  };

  const handleLogout = async () => {
    // Clear all the authentication cookies
    deleteAuthTokenCookies();

    // Use the supabase auth.signOut() method if needed
    await supabase.auth.signOut();

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="p-4 border-r-2 w-[200px]">
      <h1 className="flex text-xl font-bold px-4 mx-auto justify-center text-center py-4 border-b-2">
        <img
          width="25"
          height="25"
          src="https://img.icons8.com/ios-filled/50/like--v1.png"
          alt="like--v1"
          className="mr-2"
        />
        <Link to="/home">Medline</Link>
      </h1>

      <ul className="">
        {LINKS.map((link) => {
          return (
            <div key={link}>
              <li className="cursor-pointer hover:bg-gray-300 duration-150 m-1 p-2 text-center rounded-md">
                <Link to={`/home/${link}`}>
                  <h1 className="text-base">{link}</h1>
                </Link>
              </li>
            </div>
          );
        })}

        <div className="m-1 p-2">
          <button className="btn w-full" onClick={handleLogout}>
            <h1 className="text-xl text-center">Logout</h1>
          </button>
        </div>
      </ul>
      {/* Centered label with hamburger and close icons */}

      <div className="relative left-[160px]">
        <label className="btn btn-circle swap swap-rotate  transform -translate-y-1/2">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
