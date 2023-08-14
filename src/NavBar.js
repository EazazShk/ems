import { Link } from "react-router-dom";
import "animate.css";
import { useState } from "react";
export default function NavBar() {
    const un = localStorage.getItem("un");
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=0.7"
            ></meta>

            <center>
                <div className="nav">
                    <label class="logo">EMS</label>
                    <div
                        className="menu"
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        <li>{un == null && <Link to="/login"> Login</Link>}</li>
                        <li>
                            {un == null && <Link to="/signup"> Signup</Link>}
                        </li>
                        <li>{un == null && <Link to="/admin"> Admin</Link>}</li>
                        <li>
                            {un == null && (
                                <Link to="/fp"> ForgotPassword</Link>
                            )}
                        </li>
                        <li>{un != null && <Link to="/"> Home</Link>}</li>
                        <li>{un != null && <Link to="/ad/:emo"> Add</Link>}</li>
                        <li>
                            {un != null && (
                                <Link to="/cp"> ChangePassword</Link>
                            )}
                        </li>
                    </ul>
                </div>

                <h1 id="navh1" class="animate__animated animate__zoomIn">
                    Employee Management System
                </h1>
            </center>
        </>
    );
}
