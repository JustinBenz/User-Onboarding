import { React, useState } from "react"

export default function Form (props) {
    const{ values, change, submit, disabled} = props;

    const changeHandler = (evt) => {
        const{ name, value, type, checked } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }

    return(
        <form onSubmit={onSubmit}>
            <label>
                Name:
                <input type="text" value={values.name} onChange={changeHandler} name="name"></input>
            </label>
            <label>
                Email:
                <input type="email" value={values.email} onChange={changeHandler} name="email"></input>
            </label>
            <label>
                Password:
                <input type="text" value={values.pass} onChange={changeHandler} name="pass"></input>
            </label>
            <label>
                TOS:
                <input type="checkbox"  onChange={changeHandler} checked={values.tos} name="tos"></input>
            </label>
            <button disabled={disabled}>Submit</button>
        </form>
    )
}