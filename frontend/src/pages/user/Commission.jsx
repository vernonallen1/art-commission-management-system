import React from "react";
import BaseLayout from "./BaseLayout";
import { useQuery } from "@tanstack/react-query";
import api from "../../api.js";

const fetchCommissions = async () => {
  return api.get("api/commissions/").then((res) => res.data);
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["commissions"],
    queryFn: fetchCommissions,
  });

  if (isLoading) return <p>loading ....</p>;
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
          <div className="bg-blue-100 rounded-xl p-4 drop-shadow-md">
            <p className="text-5xl font-bold">5</p>
            <p className="font-bold">Ongoing</p>
          </div>
          <div className="bg-blue-100 rounded-xl p-4 drop-shadow-md">
            <p className="text-5xl font-bold">20</p>
            <p className="font-bold">Completed</p>
          </div>
          <div className="bg-blue-100 rounded-xl p-4 drop-shadow-md">
            <p className="text-5xl font-bold">$250</p>
            <p className="font-bold">Deposit</p>
          </div>

          <div className="mt-5 h-screen col-span-3 rounded-xl drop-shadow-md">
            <div className="flex justify-between px-6 py-4">
              <span className="text-xl">Commission History</span>
              <button className="px-2 bg-blue-400 rounded-md">Filters</button>
            </div>
            <div className="h-1 bg-blue-200 drop-shadow-md"></div>
            <div className="grid grid-cols-10 px-6">
              {tableHeaders.map((header, index) => {
                const [title, span] = Object.entries(header)[0];
                return (
                  <div
                    key={index}
                    className={`text-center py-3 font-bold col-span-${span}`}
                  >
                    {title}
                  </div>
                );
              })}
            </div>

            {data.map((commission, index) => {
              return (
                <div className={`grid grid-cols-10 mx-6 rounded-md my-4 ${index % 2 === 0 ? "bg-blue-100" : "bg-white"}`} key={commission.id}>
                  <div className="text-center p-1">{commission.id}</div>
                  <div className="text-center p-1 col-span-2">
                    {formatDate(commission.created_at)}
                  </div>
                  <div className="text-center p-1 col-span-2">
                    {commission.commission_size}
                  </div>
                  <div className="text-center p-1 col-span-2">
                    {commission.commission_style}
                  </div>
                  <div className="text-center p-1">
                    ${commission.price + commission.tip}.00
                  </div>
                  <div className="text-center p-1">{commission.status}</div>
                  <div className="text-center p-1">
                    {formatDate(commission.completion_date)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Commission;
