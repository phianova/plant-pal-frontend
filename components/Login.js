"use client"

import { useState } from "react";

const Login = (props) => {
    const [disabled, setDisabled] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setDisabled(true);
        props.client.login(e.target.username.value, e.target.password.value).then((response) => {
            setDisabled(false);
            props.loggedIn(response.data.token)
        }).catch(() => {
            alert("an error occured.")
            setDisabled(false);
        })
    }
  return (
    <div>
        login 
        <form onSubmit={submitHandler}>
            username <input type="text" name="username" disabled={disabled} />
            password <input type="password" name="password" disabled={disabled} />
            <button type="submit" disabled={disabled}>login</button>
        </form>
    </div>
  )
}

export default Login