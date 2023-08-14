import "./App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

import Admin from "./Admin";
import AdminPage from "./AdminPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import Add from "./Add";
import Update from "./Update";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route path="/ad/:emno" element={<Add />} />
                    <Route path="/update/:emno" element={<Update />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/fp" element={<ForgotPassword />} />
                    <Route path="/cp" element={<ChangePassword />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
