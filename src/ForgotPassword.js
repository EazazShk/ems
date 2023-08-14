import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ForgotPassword() {
    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            nav("/home");
        }
    }, []);
    const nav = useNavigate();
    const [un, setUn] = useState("");

    const hUn = (event) => {
        setUn(event.target.value);
    };

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        if (un === "") {
            toast.warn("Enter email id to reset password", {
                theme: "colored",
            });
        } else {
            sendPasswordResetEmail(auth, un)
                .then((res) => {
                    toast.success("Check ur gmail ", { theme: "colored" });
                    nav("/login");
                })
                .catch((err) =>
                    toast.error("Issue ", { theme: "colored" } + err)
                );
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
                    <div id="container5" class="my-element">
                        <h1> Forgot Password </h1>
                        <form onSubmit={check}>
                            <input
                                type="text"
                                placeholder="Enter Reg Email"
                                onChange={hUn}
                                value={un}
                            />
                            <br />
                            <br />
                            <input
                                type="submit"
                                value="Reset"
                                id="resetbutton"
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
