import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "animate.css";
export default function SignUp() {
    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/home");
        }
    }, []);

    const nav = useNavigate();
    const [un, setUn] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const hUn = (event) => {
        setUn(event.target.value);
    };
    const hPw1 = (event) => {
        setPw1(event.target.value);
    };
    const hPw2 = (event) => {
        setPw2(event.target.value);
    };

    const save = (event) => {
        event.preventDefault();
        if (un === "") {
            toast.warn("Email Id cannot be empty!", { theme: "colored" });
        } else if (pw1 === "") {
            toast.warn("Password cannot be empty!", { theme: "colored" });
        } else if (pw2 === "") {
            toast.warn(" Confirm Password cannot be empty!", {
                theme: "colored",
            });
        } else if (pw1 === pw2) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, un, pw1)
                .then((res) => {
                    nav("/login");
                    toast.success("User Created");
                })
                .catch((err) =>
                    toast.error("Issue ", { theme: "colored" } + err)
                );
            setPw1("");
            setPw2("");
        } else {
            toast.error("Passwords did not match", { theme: "colored" });
            setPw1("");
            setPw2("");
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
                    <div id="container3" class="my-element">
                        <h1> Signup </h1>
                        <form onSubmit={save}>
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
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={hPw2}
                                value={pw2}
                            />
                            <br />
                            <br />
                            <input
                                type="submit"
                                value="Register"
                                id="regbutton"
                            />
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}
