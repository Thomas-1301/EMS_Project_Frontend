import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const hasRun = useRef(false); // 👈 Flag to track first run

    useEffect(() => {
        const confirmAndDelete = async () => {
            const confirmed = window.confirm("Are you sure you want to delete this employee?");
            if (confirmed) {
                try {
                    const delete_token = localStorage.getItem("token");
                    await axios.delete(`http://localhost:8000/api/employee/${id}/`, {
                        headers: { Authorization: `Token ${delete_token}` },
                    });
                    alert("Employee deleted successfully");
                    navigate("/dashboard");
                } catch (error) {
                    console.error(error);
                    alert("Error deleting the employee");
                    navigate("/dashboard");
                }
            } else {
                navigate("/dashboard"); // Redirect back if user cancels
            }
        };
        if (!hasRun.current) {
            hasRun.current = true;
            confirmAndDelete();
        }
    }, [id, navigate]);

    return null; // No UI required as it’s handled via confirmation popup
};

export default DeleteEmployee;
