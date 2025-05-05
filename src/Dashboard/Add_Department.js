import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
    const [deptName, setDepartmentName] = useState("");
    const navigate = useNavigate();

    const handleDepartmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth_token = localStorage.getItem("token");
            await axios.post("http://localhost:8000/api/department/",
                {
                    DepartmentName: deptName
                },
                { headers: { Authorization: `Token ${auth_token}` } }
            );
            alert("Department added succesfully");
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);
            alert("Error adding department");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Add New Department</h2>
                <form onSubmit={handleDepartmentSubmit}>
                    <div className="mb-3">
                        <label htmlFor="departmentName" className="form-label">
                            Department Name:
                        </label>
                        <input
                            type="text"
                            id="departmentName"
                            className="form-control"
                            value={deptName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary me-2">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddDepartment;