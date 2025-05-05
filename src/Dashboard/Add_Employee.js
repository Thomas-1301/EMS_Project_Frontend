import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
    const [emp_name, setEmployeeName] = useState("");
    const [designation, setDesignation] = useState("");
    const [phone, setContact] = useState("");
    const [deptID, setDepartmentID] = useState("");
    const [departments, setDepartments] = useState([]);
    const [available, setIsActive] = useState("");
    const [doj, setDOJ] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("https://thomas0305.pythonanywhere.com/api/department/");
                setDepartments(response.data)
            }
            catch (error) {
                console.log(error);
                alert("Error fetching the departments!!");
            }
        };
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("https://thomas0305.pythonanywhere.com/api/employee/",
                {
                    EmployeeName: emp_name,
                    Designation: designation,
                    Contact: phone,
                    DepartmentID: deptID,
                    IsActive: available,
                    DateOfJoining: doj
                },
                { headers: { Authorization: `Token ${token}` } }
            );
            alert("Employee added successfully");
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);
            alert("Error adding employee");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col md-6">
                    <div className="card shadow p-4">
                        
                        <h2 className="text-center mb-4">Add Employee</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Employee Name</label>
                                <input
                                    type="text" className="form-control" placeholder="Enter employee name..."
                                    value={emp_name} onChange={(e) => setEmployeeName(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <input
                                    type="text" className="form-control" placeholder="Enter designation..."
                                    value={designation} onChange={(e) => setDesignation(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contact</label>
                                <input
                                    type="text" className="form-control" placeholder="Enter contact number..."
                                    value={phone} onChange={(e) => setContact(e.target.value)}
                                    required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <select className="form-select" value={deptID}
                                    onChange={(e) => setDepartmentID(e.target.value)} required>
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.DepartmentID} value={dept.DepartmentID}>
                                            {dept.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date of Joining</label>
                                <input type="date" className="form-control" value={doj}
                                    onChange={(e) => setDOJ(e.target.value)} required />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" checked={available}
                                    onChange={(e) => setIsActive(e.target.value)} />
                                <label className="form-check-label">Is Active</label>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary me-md-2"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Back
                                </button>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Add Employee</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
/**
 * <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary me-md-2"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Back
                                </button>
                                <button type="submit" className="btn btn-primary">Add Employee</button>
                            </div>
 * 
 */