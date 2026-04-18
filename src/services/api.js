const BASE_URL = "https://api.mentorsarthi.com"; // Replace with actual base URL

const getHeaders = (token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (res) => {
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Something went wrong");
  return data;
};

// Auth APIs
export const loginApi = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const registerApi = async (payload) => {
  const res = await fetch(`${BASE_URL}/api/auth/register/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const googleAuthApi = async (idToken) => {
  const res = await fetch(`${BASE_URL}/api/accounts/google-auth/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ id_token: idToken }),
  });
  return handleResponse(res);
};

// User APIs
export const getMyProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/api/accounts/user/me/`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

// Mentor APIs
export const getMentors = async (token, filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/api/mentors/?${params}`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};

export const getMentorAvailability = async (token, mentorId) => {
  const res = await fetch(
    `${BASE_URL}/api/mentor-profile/${mentorId}/availability/`,
    { headers: getHeaders(token) }
  );
  return handleResponse(res);
};

// Booking APIs
export const createSessionRequest = async (token, payload) => {
  const res = await fetch(`${BASE_URL}/api/accounts/session-request/`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const getMyBookings = async (token) => {
  const res = await fetch(`${BASE_URL}/api/accounts/my-bookings/`, {
    headers: getHeaders(token),
  });
  return handleResponse(res);
};
