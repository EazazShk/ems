import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/login");
        }
    }, []);
    const nav = useNavigate();
    const [un, setUn] = useState("");
    const [pw1, setPw1] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const hUn = (event) => {
        setUn(event.target.value);
    };
    const hPw1 = (event) => {
        setPw1(event.target.value);
    };
    const hSecretKey = (event) => {
        setSecretKey(event.target.value);
    };
    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        if (secretKey === "") {
            toast.warn("Plssz Enter the Secret Key", { theme: "colored" });
        } else if (un === "") {
            toast.warn("Enter the User/Email Id", { theme: "colored" });
        } else if (pw1 === "") {
            toast.warn("Plssz enter the Password", { theme: "colored" });
        } else if (
            secretKey === "Eazazs051" &&
            signInWithEmailAndPassword(auth, un, pw1)
        ) {
            localStorage.setItem("un", un);
            nav("/adminpage");
            toast.success("LoggedIn as Admin", { theme: "colored" });
        } else {
            toast.error("Invalid Secret key or email/password combination", {
                theme: "colored",
            });
            setPw1("");
            setUn("");
            setSecretKey("");
        }
    };
    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=0.7"
            ></meta>
            <center>
                <NavBar />
                <div class="center-container">
                    <div id="container4" class="my-element">
                        <h1>Login as Admin </h1>
                        <form onSubmit={check}>
                            <input
                                type="password"
                                placeholder="Secret Key"
                                onChange={hSecretKey}
                                value={secretKey}
                            />
                            <br />
                            <br />
                            <input
                                type="text"
                                placeholder="Enter Email"
                                onChange={hUn}
                                value={un}
                            />
                            <br />
                            <br />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                onChange={hPw1}
                                value={pw1}
                            />
                            <br />
                            <br />
                            <input type="submit" value="Login" id="AdLogin" />
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}
