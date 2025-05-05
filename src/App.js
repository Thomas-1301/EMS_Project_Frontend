import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Authentication/Signup.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Authentication/Login.js";
import Dashboard from "./Dashboard/Dashboard.js";
import AddEmployee from "./Dashboard/Add_Employee.js";
import EditEmployee from "./Dashboard/Edit_Employee.js";
import AddDepartment from "./Dashboard/Add_Department.js";
import NewDeleteEmployee from "./Dashboard/NewDelete_Employee.js";

function App()
{
  return(
    <Router>
      <Routes>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/" element = {<Login/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/add-employee" element = {<AddEmployee/>}/>
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/add-department" element = {<AddDepartment/>}/>
        <Route path="/delete-employee/:id" element={<NewDeleteEmployee/>} />
      </Routes>
    </Router>
  )
}
export default App;