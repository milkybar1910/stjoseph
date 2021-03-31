import { API } from "../../backend";

//getting student details
export const getStudentDetails = (studentID, token) => {
  return fetch(`${API}/student/${studentID}`, {
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
export const getStudentForNotifications = (studentID, token) => {
  return fetch(`${API}/student/admin/${studentID}`, {
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

//updating the student details
export const updateStudentProfile = (studentId, token, product) => {
  return fetch(`${API}/student/update/${studentId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createInternship = (id, token, internship) => {
  return fetch(`${API}/internship/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: internship,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getInternship = (id, token) => {
  return fetch(`${API}/internship/details/info/${id}`, {
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

export const removeInternship = (id) => {
  return fetch(`${API}/internship/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createWorkshop = (id, token, workshop) => {
  return fetch(`${API}/workshop/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: workshop,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getWorkshop = (id, token) => {
  return fetch(`${API}/workshop/details/info/${id}`, {
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

export const removeWorkshop = (id) => {
  return fetch(`${API}/workshop/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createCourse = (id, token, course) => {
  return fetch(`${API}/course/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCourse = (id, token) => {
  return fetch(`${API}/course/details/info/${id}`, {
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

export const removeCourse = (id) => {
  return fetch(`${API}/course/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getJobInfo = (id, token) => {
  return fetch(`${API}/job/details/info/${id}`, {
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

export const createJob = (id, token, job) => {
  return fetch(`${API}/job/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: job,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeJob = (id) => {
  return fetch(`${API}/job/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getNotifications = (year) => {
  return fetch(`${API}/notifications/details/${year}`, {
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

export const DynamicUpdateStudent = (id, token, form) => {
  return fetch(`${API}/student/dynamicUpdate/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchForm = (id, year) => {
  return fetch(`${API}/dynamicForms/submission/details/${id}/${year}`, {
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
