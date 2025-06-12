import { useState, useEffect } from "react";
import api from "../../api.js";
import Note from "../../components/Note.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";
import BaseLayout from "./BaseLayout.jsx";
import img2 from "../../assets/img2.jpg";

function Home() {
  const isSuperuser = localStorage.getItem("is_superuser") === "true";
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const bookCommission = () => {
    navigate("/book-commission");
  };

  return (
    <BaseLayout>
      <div class="min-h-screen p-4 grid grid-cols-8 grid-rows-8 gap-x-4 gap-y-5">
        <div class="flex bg-gray-500 min-h-[100px] row-span-2 rounded-xl col-span-8 p-5 justify-end items-end">
          <button
            className="bg-blue-500 p-2 rounded-xl font-bold text-white"
            onClick={bookCommission}
          >
            Book Commission
          </button>
        </div>
        <div className="flex items-center justify-center col-span-4">
          <span class="text-xl font-bold">Welcome {username}!</span>
        </div>
        <div className="bg-gray-500 min-h-[50px] rounded-xl row-span-3 col-span-2"></div>
        <img className="bg-gray-500 min-h-[50px] max-h-[230px] rounded-xl row-span-3 col-span-2"></img>
        <div className="bg-gray-500 min-h-[50px] rounded-xl row-span-5 col-span-4"></div>
        <div className="bg-gray-500 min-h-[50px] rounded-xl row-span-3 col-span-2"></div>
        <div className="bg-gray-500 min-h-[50px] rounded-xl row-span-3 col-span-2"></div>
      </div>
    </BaseLayout>
  );
}

export default Home;
