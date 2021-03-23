import React from "react";
import ReactDOM from "react-dom";
import CustomForm from "./customForm";

let fields = [
{
    id: "fullname",
    name:"Full name",
    type:"text",
    required: true,
    pattern:"^[a-zA-Z]+ [a-zA-Z]+$"
},
{
    id: "name",
    name: "Name",
    type: "text",
    required: true,
    alphanum: true
},
{
    id: "email",
    name: "Email",
    type: "email",
    placeholder: "Type your email",
    required:  true
},
{
    id: "password",
    name: "Password",
    type: "password",
    required: true,
    min: 8,
    max: 20
},
{
    id: "repeat_password",
    name: "Repeat password",
    type: "password",
    required: true,
    min: 8,
    max: 20
}];


ReactDOM.render(<CustomForm fields = {fields}/>, document.getElementById("root"));
