import React from "react"
import '../style/App.css'

export default function UserCard (props) {
    const { data } = props;
    return (
        <div className="membercard">
            <h1>{data.name}</h1>
            <p1>{data.email}</p1>
            <p2>{data.role}</p2>
        </div>
    );
}