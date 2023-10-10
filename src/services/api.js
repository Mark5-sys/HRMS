import { API } from "../config";

export const getAllDepartments = async () => {
  const responseData = await fetch(`${API}/department`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await responseData.json();

  return response.data;
};

export const getAllPositions = async () => {
  const responseData = await fetch(`${API}/position`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await responseData.json();

  return response.data;
};

export const getAllEmployees = async () => {
  const responseData = await fetch(`${API}/employee`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await responseData.json();

  return response.data;
};

export const getSingleEmployee = async (employeeId) => {
  const responseData = await fetch(`${API}/employee/detail/${employeeId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await responseData.json();

  return response.data;
};

//Statistics

export const employeesCount = async () => {
  const response = await fetch(`${API}/employees/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
};
