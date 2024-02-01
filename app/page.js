"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ApiClient from "../utils/ApiClient";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

export default function Home() {
  const [token, setToken] = useState(null);
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
    <div className="min-h-screen text-center flex flex-col bg-gradient-to-br from-cyan-500 to-green-700">
      {token ? (
        <div>
        <Dashboard client={client} token={token}/>
        <button onClick={logout}>Logout</button>
      </div>

      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )}
      </div>
    </>
  );
}
