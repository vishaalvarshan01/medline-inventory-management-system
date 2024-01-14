import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorState } from "../context/store";
import { useRecoilState } from "recoil";

import ErrorAlert from "../components/ErrorAlert";
import supabase from "../supabaseClient";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useRecoilState(errorState);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
        setError({ status: true, message: error.message });
      } else {
        console.log("Login successful:", data);

        // Check if the access_token is available
        if (data.session && data.session.access_token) {
          document.cookie = `authToken=${data.session.access_token}; Secure; SameSite=None`;
          navigate("/home");
        } else {
          setError({ status: true, message: "Access token not available" });
          console.error("Access token not available in login response.");
        }
      }
    } catch (error) {
      setError({ status: true, message: error.message });
      console.error("An error occurred during login:", error.message);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      {error.status && <ErrorAlert errorMsg={error.message} />}
      <h1 className="text-4xl text-bold text-red-500 ">Medline Management</h1>
      <div className="border-2 border-slate-200 p-12 rounded-xl mt-10 bg-white">
        <form onSubmit={handleLogin} className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-slate-700">
                Enter your email
              </span>
            </div>
            <input
              type="email"
              placeholder="someone@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-bordered input  w-full max-w-xs bg-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </label>
          <label className="form-control w-full max-w-xs mt-3">
            <div className="label">
              <span className="label-text text-slate-700">
                Enter your password
              </span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-bordered input w-full max-w-xs bg-white"
            />
          </label>

          <button
            type="submit"
            className="my-4  py-2  w-full bg-black text-white rounded-xl border-black border-2 hover:bg-white hover:text-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
