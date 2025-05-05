import axios from "axios"

// Set the base URL for your API
const API_BASE = "http://localhost:8000/api";

//Function to log in the user
export const loginUser = (credentials) => {
    return axios.post(`${API_BASE}/login/`, credentials);
};

// Function to sign up a new user
export const signUpUser = (userData) => {
    return axios.post(`${API_BASE}/signup/`, userData);
};

// Function to add a new employee
export const addEmployee = (empData) => {
    return axios.post(`${API_BASE}/employee/`, empData);
};