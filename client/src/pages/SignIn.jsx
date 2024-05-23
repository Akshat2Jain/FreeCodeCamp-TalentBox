import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/signIn`,
        {
          email: email,
          password: password,
        }
      );
      message.success(res.data.msg);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const res2 = await axios.post(
          `${import.meta.env.VITE_APP_ENDPOINT}/user/googleSignUp`,
          {
            username: res.data.name,
            email: res.data.email,
          }
        );
        const token = res2.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: "#f1be32", color: "black" }}
                  className="w-full text-center py-2 rounded-lg"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline hover:cursor-pointer dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              <button
                onClick={() => login()}
                className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200"
              >
                <FcGoogle className="mr-2" size={20} />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
