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
      {token ? (
        <Dashboard client={client} />
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )}
    </>
  );
}
