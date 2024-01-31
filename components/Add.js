"use client";

import { useState } from "react";

const Add = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
    // <div
    //           key={index}
    //           className={`flex flex-col px-10  ${hoveredIndex === index ? 'bg-gradient-to-br from-blue-100 to-blue-200' : ''}`}
    //           onMouseEnter={() => setHoveredIndex(index)}
    //           onMouseLeave={() => setHoveredIndex(null)}
    //         >
    <div className="top-0 right-0 fixed p-4 rounded-lg text-center flex flex-col bg-slate-200 opacity-80">
        
        <h2 className="text-2xl p-6 font-bold">Add New Plant</h2>
        <form onSubmit={submitHandler} id="addForm">
           <div className="flex flex-row gap-4">
           <p> Name: </p><input type="text" name="name" placeholder="Enter plant name here" disabled={disabled} />
           </div>
            <button type="submit" disabled={disabled} className="bg-cyan-400 text-white rounded m-4 p-2 hover:bg-cyan-900">Add</button>
        </form>
    </div>
    // </div>
  )
}

export default Add