import React, { useState, useEffect } from "react";
import BaseLayout from "./BaseLayout";
import { useQuery } from "@tanstack/react-query";
import api from "../../api.js";

const fetchCommissions = async (size, style, status) => {
  const params = new URLSearchParams();
  if (size) params.append("size", size);
  if (style) params.append("style", style);
  if (status) params.append("status", status);

  return await api.get(`api/commissions/?${params.toString()}`).then((res) => res.data);
};

function isValidISOString(str) {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
  return isoRegex.test(str) && !isNaN(Date.parse(str));
}

function formatDate(isoString) {
  if (!isValidISOString(isoString)) return isoString;

  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const Commission = () => {
  const tableHeaders = [
    { ID: 1 },
    { "Date Appointed": 2 },
    { "Commission Size": 2 },
    { "Commission Style": 2 },
    { Price: 1 },
    { Status: 1 },
    { Completion: 1 },
  ];
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const sizes = ["Full Body", "Half Body", "Bust"];
  const styles = ["Flat-Colored", "Line Art", "Sketch", "Semi-Rendered"];
  const statuses = ["Pending", "Accepted", "In Progress", "Completed"];

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleStyleChange = (e) => {
    setSelectedStyle(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(() => {
    const loadCommissions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchCommissions(selectedSize, selectedStyle, selectedStatus);
        setData(result);
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    }

    loadCommissions();
  }, [selectedSize, selectedStyle, selectedStatus])

  if (error)
    return (
      <p>
        Error:{" "}
        {error.response?.data?.detail || error.message || "Unknown error"}
      </p>
    );

  return (
    <BaseLayout>
      <div class="min-h-screen p-4">
        <div className="grid grid-cols-3 gap-x-5">
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div>
              <p className="text-4xl font-extrabold text-blue-600">5</p>
              <p className="text-gray-600 font-medium mt-1">Ongoing</p>
            </div>
            <div className="text-blue-500 bg-blue-100 rounded-full p-3">📌</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-green-100">
            <div>
              <p className="text-4xl font-extrabold text-green-600">20</p>
              <p className="text-gray-600 font-medium mt-1">Completed</p>
            </div>
            <div className="text-green-500 bg-green-100 rounded-full p-3">
              ✅
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300 border border-yellow-100">
            <div>
              <p className="text-4xl font-extrabold text-yellow-600">$250</p>
              <p className="text-gray-600 font-medium mt-1">Deposit</p>
            </div>
            <div className="text-yellow-500 bg-yellow-100 rounded-full p-3">
              💰
            </div>
          </div>

          <div className="mt-5 h-screen col-span-3 rounded-xl drop-shadow-md mb-20">
            <div className="flex justify-between px-6 py-4">
              <span className="text-2xl font-semibold text-gray-800">Commission History</span>
              <div className="flex bg-opacity-50 flex items-center gap-x-4">
                <select
                  name="sizeFilter"
                  onChange={handleSizeChange}
                  value={selectedSize}
                  className="w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                >
                  <option value="">All Sizes</option>
                  {sizes.map((size, index) => {
                    return <option value={size}>{size}</option>;
                  })}
                </select>
                <select
                  name="styleFilter"
                  onChange={handleStyleChange}
                  value={selectedStyle}
                  className="w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                >
                  <option value="">All Styles</option>
                  {styles.map((style, index) => {
                    return <option value={style}>{style}</option>;
                  })}
                </select>
                <select
                  name="statusFilter"
                  onChange={handleStatusChange}
                  value={selectedStatus}
                  className="w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                >
                  <option value="">All Status</option>
                  {statuses.map((status, index) => {
                    return <option value={status}>{status}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="h-1 bg-blue-200 drop-shadow-md"></div>
            <div className="grid grid-cols-10 bg-gray-50 py-3 border-b border-gray-200 text-sm text-gray-700 font-medium">
              {tableHeaders.map((header, index) => {
                const [title, span] = Object.entries(header)[0];
                return (
                  <div key={index} className={`text-center col-span-${span}`}>
                    {title}
                  </div>
                );
              })}
            </div>

            {data.map((commission, index) => (
              <div
                key={commission.id}
                className={`grid grid-cols-10 rounded-lg my-2 text-sm ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors`}
              >
                <div className="text-center py-2">{commission.id}</div>
                <div className="text-center py-2 col-span-2">
                  {formatDate(commission.created_at)}
                </div>
                <div className="text-center py-2 col-span-2">
                  {commission.commission_size}
                </div>
                <div className="text-center py-2 col-span-2">
                  {commission.commission_style}
                </div>
                <div className="text-center py-2">
                  ${commission.price + commission.tip}.00
                </div>
                <div className="text-center py-2">{commission.status}</div>
                <div className="text-center py-2">
                  {formatDate(commission.completion_date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Commission;
