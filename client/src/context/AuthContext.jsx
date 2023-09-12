import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // const baseURL =
  //   "http://ec2-3-39-231-102.ap-northeast-2.compute.amazonaws.com:8080";

  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && storedRefreshToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedAccessToken}`;
    } else {
      //403 리프레시토큰보내기, 액세스1시간 리프레시2주
    }
  }, [navigate]);

  async function login(email, password) {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("memberId", response.data.memberId);
      localStorage.setItem("nickname", response.data.nickname);
      localStorage.setItem("profileImg", response.data.profileImg);
      localStorage.setItem("accessToken", response.headers["authorization"]);
      localStorage.setItem(
        "refreshToken",
        response.headers["authorization-refresh"]
      );
      navigate("/");
    } catch (error) {
      //불일치시 401에러
      if(error.response.status === 401){
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      };
      console.error("Login failed:", error);
      alert("Login failed");
      throw error;
    }
  }

  async function kakaoLogin(code) {
    try {
      const response = await axios.get(
        `${baseURL}/auth/oauth/kakao?code=${code}`
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/");
    } catch (error) {
      console.log(code);
      throw error;
    }
  }

  async function naverLogin(code) {
    try {
      const response = await axios.get(
        `${baseURL}/auth/oauth/kakao?code=${code}`
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/");
    } catch (error) {
      console.log(code);

      throw error;
    }
  }

  async function register(email, nickname, password) {
    try {
      await axios.post(`${baseURL}/auth/signup`, {
        email,
        nickname,
        password,
      });

      //navigate("/verify");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Signup failed");
      throw error;
    }
  }

  async function logout() {
    try {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("memberId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("profileImg");
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
      throw error;
    }
  }

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    kakaoLogin,
    naverLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}