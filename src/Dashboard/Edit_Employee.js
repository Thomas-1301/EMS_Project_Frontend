import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [emp_name, setEmployeeName] = useState("");
    const [designation, setDesignation] = useState("");
    const [contact, setContact] = useState("");
    const [deptID, setDepartmentID] = useState("");
    const [departments, setDepartments] = useState([]);
    const [available, setIsActive] = useState("");
    const [doj, setDOJ] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem("token");
                const empRes = await axios.get(`https://thomas0305.pythonanywhere.com/api/employee/${id}/`,
                    { headers: { Authorization: `Token ${token}`, }, }
                );
                const depRes = await axios.get("https://thomas0305.pythonanywhere.com/api/department/",
                    { headers: { Authorization: `Token ${token}`, }, }
                );

                setEmployeeName(empRes.data.EmployeeName);
                setDesignation(empRes.data.Designation);
                setContact(empRes.data.Contact);
                setDepartmentID(empRes.data.Department.DepartmentID);
                setIsActive(empRes.data.IsActive);
                setDOJ(empRes.data.DateOfJoining);
                setDepartments(depRes.data);
            }
            catch (error) {
                console.log(error);
                alert("Error fetching employee details");
            }
        };
        fetchEmployees();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`https://thomas0305.pythonanywhere.com/api/employee/${id}/`,
                {
                    EmployeeName: emp_name,
                    Designation: designation,
                    Contact: contact,
                    DepartmentID: deptID,
                    IsActive: available,
                    DateOfJoining: doj,
                },
                { headers: { Authorization: `Token ${token}`, }, }
            );
            alert("Employee updated successfully");
            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);
            alert("Error updating the employee")
        }
    };

    return (
        <div className="contain mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Edit Employee</h2>
                        <form onSubmit={handleUpdate}>
                            {/* Employee Name */}
                            <div className="mb-3">
                                <label className="form-label">Employee Name</label>
                                <input type="text" className="form-control" placeholder="Enter employee name.."
                                    value={emp_name} onChange={(e) => setEmployeeName(e.target.value)} required />
                            </div>
                            {/* Designaion Field */}
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <input type="text" className="form-control" placeholder="Enter the designation..."
                                    value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                            </div>
                            {/* Contact Field */}
                            <div className="mb-3">
                                <label className="form-label">Contact</label>
                                <input type="text" className="form-control" placeholder="Enter contact number.."
                                    value={contact} onChange={(e) => setContact(e.target.value)} required />
                            </div>
                            {/* Department Field */}
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <select className="form-select" value={deptID} onChange={(e) => setDepartmentID(e.target.value)}
                                    required>
                                    <option value="">Select Department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.DepartmentID} value={dept.DepartmentID}>
                                            {dept.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Date of Joining */}
                            <div className="mb-3">
                                <label className="form-label">Date of Joining</label>
                                <input type="date" className="form-control" value={doj}
                                    onChange={(e) => setDOJ(e.target.value)} required />
                            </div>
                            {/* Is Active field */}
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" checked={available}
                                    id="isactive" onChange={(e) => setIsActive(e.target.checked)} />
                                <label className="form-check-label" htmlFor="IsActive">Is Active</label>
                            </div>
                            {/* Update button */}
                            <button type="submit" className="btn btn-primary w-100">Update Employee</button>
                            <div className="text-center mt-3">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
                                    Back To Dashboard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmployee;