import { API } from "../../backend";

export const getBatchStudent = (id, token, year) => {
  return fetch(`${API}/student/year/${id}/${year}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getInternship = (id, token, year) => {
  return fetch(`${API}/intern/year/${id}/${year}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getWorkshop = (id, token, year) => {
  return fetch(`${API}/workshop/year/${id}/${year}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCourse = (id, token, year) => {
  return fetch(`${API}/course/year/${id}/${year}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getJobOffer = (id, token, year) => {
  return fetch(`${API}/joboffer/year/${id}/${year}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateFields = (id, token, Form) => {
  return fetch(`${API}/dynamicform/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(Form),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateToggle = (toggle) => {
  return fetch(`${API}/toggle/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toggle),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getToggleDetails = () => {
  return fetch(`${API}/toggleInfo`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFormsNameInAdmin = () => {
  return fetch(`${API}/formnames/details/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteForms = (id, year) => {
  return fetch(`${API}/form/${id}/${year}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
