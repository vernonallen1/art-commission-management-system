import React from "react";
import AdminBaseLayout from "./AdminBaseLayout";
import api from "../../api.js";
import { useQuery } from "@tanstack/react-query";

const fetchLogs = async () => {
  return api.get("api/logs/").then((res) => res.data);
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

const Logs = () => {
  const {
    data: logs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });

  if (isLoading) {
    return <div>loading.....</div>;
  }

  return (
    <AdminBaseLayout>
      <div className="grid grid-cols-12 mx-10 p-3">
        <div className="font-bold col-span-3">Log Type</div>
        <div className="font-bold col-span-2">Author</div>
        <div className="font-bold col-span-5">Action</div>
        <div className="font-bold col-span-2">Datetime</div>
      </div>
      {logs &&
        logs.map((log, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-12 mx-10 px-3 py-2 border-b border-gray-200 cursor-pointer bg-gray-100 rounded-md my-2"
            >
              <div className="p-0.5 col-span-3">{log.kind}</div>
              <div className="p-0.5 col-span-2">{log.user.username}</div>
              <div className="p-0.5 col-span-5">{log.message}</div>
              <div className="p-0.5 col-span-2">{formatDate(log.created_at)}</div>
            </div>
          );
        })}
    </AdminBaseLayout>
  );
};

export default Logs;
