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

export const genderStatistics = async () => {
  const response = await fetch(`${API}/employees/gender/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
};

export const maritalStatistics = async () => {
  const response = await fetch(`${API}/employees/marital/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
};

export const employeeByDepartment = async () => {
  const response = await fetch(`${API}/departments/employees/count`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  return responseData;
};

export const ageStatistics = async () => {
  const response = await fetch(`${API}/age/statistics`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
};

//Orients routes

export const getAllOrients = async () => {
  const response = await fetch(`${API}/orientation`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData.data;
};

export const getAllCompanies = async () => {
  const response = await fetch(`${API}/company`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData.data;
};

export const getOrientationMonthlyStats = async () => {
  const response = await fetch(`${API}/monthly-orientation-stats`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData;
};


export const getRumukoSchedule = async () => {
  const response = await fetch(`${API}/rumuko/scheduler`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData.data;
};

