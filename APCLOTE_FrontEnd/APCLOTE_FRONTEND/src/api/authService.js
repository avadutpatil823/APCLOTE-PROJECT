import axios from "axios";

const API_URL = "http://localhost:9898/api";

export const sendOtp = async (email) => {
  return await axios.post(`${API_URL}/send-otp`, { email });
};

export const verifyOtp = async (email, otp) => {
  return await axios.post(`${API_URL}/verify-otp`, { email, otp });
};

export const resetPassword = async (email, newPassword) => {
  return await axios.post(`${API_URL}/reset-password`, { email, newPassword });
};
