import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { ref, set } from "firebase/database";
import db from "./FbConfig";
import { toast } from "react-toastify";
export default function Add() {
    const nav = useNavigate();
    const [user, setUser] = useState("");
    const [emno, setEmno] = useState("");
    const [name, setName] = useState("");
    const [emsalary, setEmsalary] = useState("");

    const hName = (event) => {
        setName(event.target.value);
    };
    const hEmno = (event) => {
        setEmno(event.target.value);
    };
    const hEmsalay = (event) => {
        setEmsalary(event.target.value);
    };

    //getting the username and storing it in local storage for later usage

    const saveAs = (event) => {
        event.preventDefault();

        if (emno === "") {
            toast.warn("Employee No cannot be Empty", { theme: "colored" });
        } else if (parseInt(emno) < 0) {
            toast.error("Employee No cannot be negative", { theme: "colored" });
            setEmno("");
        } else if (name === "") {
            toast.warn("Name cannot be empty", { theme: "colored" });
        } else if (name.length < 3) {
            toast.warn("Name should contain at least 3 letters", {
                theme: "colored",
            });
        } else if (emsalary === "") {
            toast.warn("Salary cannot be Empty", { theme: "colored" });
        } else if (parseInt(emsalary) < 0) {
            toast.error("Salary cannot be negative", { theme: "colored" });
            setEmsalary("");
        } else {
            let data = { emno, name, emsalary };
            let node = emno;
            let r = ref(db, "em/" + node);
            set(r, data);

            toast.success("Employee Added");
            setEmno("");
            setName("");
            setEmsalary("");
            nav("/home");
        }
    };

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            setUser("Welcome " + un);
        } else {
            nav("/login");
        }
    }, []);

    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=0.5"
            ></meta>
            <center>
                <NavBar />
                <div class="center-container">
                    <div id="container6" class="my-element">
                        <h1>Add Employee</h1>
                        <h2> {user} </h2>
                        <form onSubmit={saveAs}>
                            <input
                                type="number"
                                placeholder="Employee Id"
                                onChange={hEmno}
                                value={emno}
                            />
                            <br />
                            <br />
                            <input
                                type="text"
                                placeholder="Enter Name"
                                onChange={hName}
                                value={name}
                            />
                            <br />
                            <br />
                            <input
                                type="number"
                                placeholder="Enter ur salary"
                                onChange={hEmsalay}
                                value={emsalary}
                                id="txt"
                            />
                            <br />
                            <br />
                            <div id="child1">
                                <Link to={"/home"}>
                                    <button id="backbutton">Back</button>
                                </Link>
                            </div>

                            <input type="submit" id="homesubbutton" />
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}
