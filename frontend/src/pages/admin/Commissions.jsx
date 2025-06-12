import React, { useState, useEffect } from "react";
import api from "../../api.js";
import { useQuery } from "@tanstack/react-query";
import AdminBaseLayout from "./AdminBaseLayout.jsx";
import { Check, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fetchPendingCommissions = async () => {
  return api.get("api/commissions/?status=Pending").then((res) => res.data);
};

const fetchAcceptedCommissions = async () => {
  return api.get("api/commissions/?status=Accepted").then((res) => res.data);
};

const fetchInProgressCommissions = async () => {
  return api.get("api/commissions/?status=In Progress").then((res) => res.data);
};

const fetchCompletedCommissions = async () => {
  return api.get("api/commissions/?status=Completed").then((res) => res.data);
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

const Commissions = () => {
  const [tab, setTab] = useState("Pending");
  const [data, setData] = useState();

  const navigate = useNavigate();

  const viewCommission = (id) => {
    navigate(`/commissions/${id}`);
  };

  const setTabData = (tab, data) => {
    setTab(tab);
    setData(data);
  };

  const tableHeaders = [
    { Username: 1 },
    { ID: 1 },
    { "Date Appointed": 2 },
    { "Commission Size": 2 },
    { "Commission Style": 2 },
    { Price: 1 },
    { Tip: 1 },
  ];

  const {
    data: pcom,
    isLoading: pIsLoading,
    error: pError,
  } = useQuery({
    queryKey: ["commissions", { status: "pending" }],
    queryFn: fetchPendingCommissions,
  });

  useEffect(() => {
    if (pcom) {
      setData(pcom);
    }
  }, [pcom]);

  const {
    data: acom,
    isLoading: aIsLoading,
    error: aError,
  } = useQuery({
    queryKey: ["commissions", { status: "accepted" }],
    queryFn: fetchAcceptedCommissions,
  });

  const {
    data: iPcom,
    isLoading: iPIsLoading,
    error: iPError,
  } = useQuery({
    queryKey: ["commissions", { status: "in progress" }],
    queryFn: fetchInProgressCommissions,
  });

  const {
    data: ccom,
    isLoading: cIsLoading,
    error: cError,
  } = useQuery({
    queryKey: ["commissions", { status: "completed" }],
    queryFn: fetchCompletedCommissions,
  });

  return (
    <AdminBaseLayout>
      <div className="grid grid-cols-4 py-3 mx-10 cursor-pointer">
        <div
          className="flex justify-center items-center flex-col"
          onClick={() => setTabData("Pending", pcom)}
        >
          <p className="font-bold">Pending</p>
          {tab === "Pending" && <div className="h-0.5 w-1/3 bg-blue-500"></div>}
        </div>
        <div
          className="flex justify-center items-center flex-col"
          onClick={() => setTabData("Accepted", acom)}
        >
          <p className="font-bold">Accepted</p>
          {tab === "Accepted" && (
            <div className="h-0.5 w-1/3 bg-blue-500"></div>
          )}
        </div>
        <div
          className="flex justify-center items-center flex-col"
          onClick={() => setTabData("In Progress", iPcom)}
        >
          <p className="font-bold">In Progress</p>
          {tab === "In Progress" && <div className="h-0.5 w-1/3 bg-blue-500"></div>}
        </div>
        <div
          className="flex justify-center items-center flex-col"
          onClick={() => setTabData("Completed", ccom)}
        >
          <p className="font-bold">Completed</p>
          {tab === "Completed" && (
            <div className="h-0.5 w-1/3 bg-blue-500"></div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-10 mx-10 px-3 bg-blue-300 rounded-xl mb-5">
        {tableHeaders.map((header, index) => {
          const [title, span] = Object.entries(header)[0];
          return (
            <div key={index} className={`py-3 font-bold col-span-${span}`}>
              {title}
            </div>
          );
        })}
      </div>
      {data &&
        data.map((commission, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-10 mx-10 px-3 py-2 border-b border-gray-200 hover:bg-gray-300 cursor-pointer bg-gray-100 rounded-md my-2"
              onClick={() => viewCommission(commission.id)}
            >
              <div className="col-span-1">{commission.author.username}</div>
              <div className="col-span-1">{commission.id}</div>
              <div className="col-span-2">
                {formatDate(commission.created_at)}
              </div>
              <div className="col-span-2">
                {formatDate(commission.commission_size)}
              </div>
              <div className="col-span-2">
                {formatDate(commission.commission_style)}
              </div>
              <div className="col-span-1">{formatDate(commission.price)}</div>
              <div className="col-span-1">{formatDate(commission.tip)}</div>
            </div>
          );
        })}
    </AdminBaseLayout>
  );
};

export default Commissions;
