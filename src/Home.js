import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import db from "./FbConfig";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Home() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        let un = localStorage.getItem("un");
        if (un != null) {
            setUser("Welcome " + un);
        } else {
            window.location.href = "/login/";
        }
    }, []);

    useEffect(() => {
        const fetchData = () => {
            const databaseRef = ref(db, "em");
            onValue(databaseRef, (snapshot) => {
                const fetchedData = snapshot.val();
                if (fetchedData) {
                    const dataArray = Object.keys(fetchedData).map((key) => ({
                        ...fetchedData[key],
                        emno: key,
                    }));
                    setData(dataArray);
                }
            });
        };

        fetchData();
    }, []); // Fetch data when the component mounts and on database updates

    const lo = (event) => {
        event.preventDefault();
        const ans = window.confirm("Are u sure ❓");
        if (ans) {
            localStorage.clear();
            nav("/login");
            toast.success("Logged Out", { theme: "colored" });
        }
    };
    const add = (event) => {
        event.preventDefault();
        nav("/ad/:emo");
    };

    const de = (event) => {
        event.preventDefault();
        const answer = window.confirm("Are u Sure ❓ ");
        if (answer) {
            const auth = getAuth();
            const user = auth.currentUser;

            deleteUser(user)
                .then(() => {
                    localStorage.clear();
                    nav("/login");
                    toast.success("User Deleted", { theme: "colored" });
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
                content="width=device-width, initial-scale=0.8"
            ></meta>
            <center>
                <NavBar />
                <div class="center-container">
                    <div id="containerH" class="my-elementH">
                        <h1> Home </h1>
                        <h1> {user}</h1>
                        <table border={4} style={{ width: "auto" }}>
                            <tr>
                                <th>Employee Id</th>
                                <th>Name</th>
                                <th>Salary</th>
                            </tr>
                            {data.map((item) => (
                                <tr
                                    key={item.emno}
                                    style={{ textAlign: "center" }}
                                >
                                    <td>{item.emno}</td>
                                    <td>{item.name}</td>
                                    <td>{item.emsalary}</td>
                                </tr>
                            ))}
                        </table>
                        <br />
                        <form onSubmit={add}>
                            <input type="submit" value="Add" id="addbt" />
                        </form>

                        <form onSubmit={lo}>
                            <input type="submit" value="Logout" id="logout" />
                        </form>

                        <form onSubmit={de}>
                            <input
                                type="submit"
                                value="Del User"
                                id="deleteuser"
                            />
                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}
