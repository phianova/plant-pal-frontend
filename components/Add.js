"use client";

import { useState } from "react";

const Add = (props) => {
    const [disabled, setDisabled] = useState(false);

    const submitHandler = (e) => {
        // stop the page from refreshing when the user submits the form. That is the default behaviour of HTML forms
        e.preventDefault();
        setDisabled(true);
        let result;

        // form validation to make sure we send the correct data and types to the backend
        e.target.name.value = String(e.target.name.value)
        if (!e.target.name.value || !typeof e.target.name.value === "string" ) {
            alert("Please enter a valid name")
            setDisabled(false);
            return;
        }

        result = props.client.addPlant(e.target.name.value, props.token);

        result.then(() => {
            setDisabled(false);
            document.getElementById("addForm").reset();
            props.refreshList();
        }).catch(() => {
            alert("there was an error")
            setDisabled(false);
        })
    }
  return (
    <div>
        <h2>Add new plant</h2>
        <form onSubmit={submitHandler} id="addForm">
            Name: <input type="text" name="name" placeholder="Enter plant name here" disabled={disabled} />
            <button type="submit" disabled={disabled}>Add</button>
        </form>
    </div>
  )
}

export default Add