// useEffect is used to run the code after the component is rendered
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    // employees holds the list of employees. Initially it is an empty array
    const [employees, setEmployees] = useState([]);
    // departments hold the department names with their IDs as keys
    const [departments, setDepartments] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // We are setting the initial page number to '1'
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;                         // Showing 5 employee records per page
    const navigate = useNavigate();

        useEffect(() => {
        // Fetch data is an async function to get Employee and Department data
        const fetchData = async () => {
            try {
                const employee_token = localStorage.getItem("token");

                //Send a request to aget all employees and the result is stored in the empRes
                const empRes = await axios.get("https://thomas0305.pythonanywhere.com/api/employee/",
                    {
                        headers: {
                            'Authorization': `Bearer ${employee_token}`
                        }
                    }
                );
                const depRes = await axios.get("https://thomas0305.pythonanywhere.com/api/department/",
                    {
                        headers: {
                            'Authorization': `Bearer ${employee_token}`
                        }
                    }
                );

                // Converts department array into an object for easy lookup
                const deptMap = {};
                //deptMap is a js object to store key value pairs
                depRes.data.forEach((dept) => {
                    deptMap[dept.DepartmentID] = dept.DepartmentName;
                });

                setEmployees(empRes.data);
                setDepartments(deptMap);
            }
            catch (error) {
                console.log(error);
                alert("Error fetching the data.... Please refer the console for more info!")
            }
        };
        fetchData();
    }, []);

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filter employees based on the search term
    const filteredEmployees = employees.filter((emp) => {
        const deptName = departments[emp.Department?.DepartmentID] || "Unknown";
        return (
            emp.EmployeeName.toLowerCase().includes(searchTerm) ||
            emp.Designation.toLowerCase().includes(searchTerm) ||
            deptName.toLowerCase().includes(searchTerm)
        );
    });

    // currentPage = The page number we are on right now
    // employeesPerPage = How many employee records we want to show on each page
    // index_Of_LastEmployee = Calculates the last position of the employee to show on the current page
    const index_Of_LastEmployee = currentPage * employeesPerPage;
    const index_of_FirstEmployee = index_Of_LastEmployee - employeesPerPage;
    const current_employees = filteredEmployees.slice(index_of_FirstEmployee, index_Of_LastEmployee);
    const total_pages = Math.ceil(filteredEmployees.length/employeesPerPage);
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0">Dashboard</h2>
                <div>
                    <Link to="/add-employee" className="btn btn-success me-2">Add Employee</Link>
                    <Link to="/add-department" className="btn btn-secondary me-2">Add Department</Link>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {/*Employee List*/}
            <div className="card p-3 mb-4">
                <h3>Employees</h3>
                <input
                    type="text"
                    placeholder="Search by name, designation or department..."
                    className="form-control w-50"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current_employees.map((emp) => (
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Designation}</td>
                                <td>{departments[emp.Department?.DepartmentID] || "Unknown"}</td>
                                <td>
                                    <Link
                                        to={`/edit-employee/${emp.EmployeeID}`}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/delete-employee/${emp.EmployeeID}`}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination Buttons */}
                <div className="d-flex justify-content-center mt-3">
                    <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setCurrentPage((prev) => Math.max(prev-1, 1))}
                    disabled={currentPage===1}>Previous</button>
                    <span className="align-self-center">Page {currentPage} of {total_pages}</span>
                    <button className="btn btn-outline-primary me-2"
                    onClick={() => setCurrentPage((prev) => Math.min(prev+1, total_pages))}
                    disabled = {currentPage === total_pages}>Next</button>
                </div>
            </div>
            <div className="card p-3"></div>
            <h3>Department</h3>
            <ul className="list-group">
                {Object.values(departments).map((deptName, index) => (
                    <li key={index} className="list-group-item">{deptName}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;
/**
 * <button 
                    className="btn btn-success"
                    onClick={() => navigate('/add-employee')}
                >
                    Add Employee
                </button>

 */