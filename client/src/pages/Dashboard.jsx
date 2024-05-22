import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import UserNavbar from "../components/UserNavbar";
import { message } from "antd";
import axios from "axios";
const Dashboard = () => {
  const [course, setCourse] = useState([]);

  async function getCourses() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_ENDPOINT}/user/getCourses`
      );
      setCourse(res.data.courses);
    } catch (error) {
      message.error(error.response.data.msg);
    }
  }
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <UserNavbar />
      <div
        style={{ backgroundColor: "#f5f6f7" }}
        className="text-black font-body py-16 flex justify-center min-h-screen"
      >
        <div className="text-center w-full max-w-2xl p-8">
          <h1 className="text-3xl font-mono mb-4">
            Welcome to freeCodeCamp.org
          </h1>
          <p className="text-lg font-mono mt-2">
            "I have not failed, I have just found out 10,000 ways that won't
            work."
          </p>
          <p className="text-lg font-mono mb-8">- Thomas A. edison</p>
          {course.map((c, key) => (
            <Card course={c} key={c.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
