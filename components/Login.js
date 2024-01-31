"use client"

import { useState } from "react";

const Login = (props) => {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    props.client.login(e.target.username.value, e.target.password.value).then((response) => {
      setDisabled(false);
      props.loggedIn(response.data.token);
    }).catch(() => {
      alert("An error occurred.");
      setDisabled(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md bg-opacity-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
              disabled={disabled}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              disabled={disabled}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={disabled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
