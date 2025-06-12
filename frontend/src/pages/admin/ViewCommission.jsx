import React, { useState } from "react";
import AdminBaseLayout from "./AdminBaseLayout.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api.js";
import { toast } from "react-toastify";

async function fetchCommission(id) {
  const res = await api.get(`api/commissions/${id}`);
  return res.data;
}

async function updateCommissionStatus(id, status, navigate) {
  const res = await api.patch(`api/commissions/${id}`, { status: status });
  toast.success(`Successfully set commission's status to ${status}`);
  const username = localStorage.getItem("username");
  create_log("Commission Status Update", `${username} updated commission status to ${status}.`)
  navigate(-1);
  return res.data;
}

async function getReferenceImages(id) {
  const res = await api.get(`api/commission/reference-images/${id}`);
  return res.data;
}

const create_log = async (kind, message) => {
  api.post("/api/logs/", { kind: kind, message: message });
  if (res.status === 201) {
    return toast.success("Logged commission create."); // Return the created commission
  } else {
    toast.error("Failed to create commission log.");
    return null;
  }
};

const ViewCommission = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data,
    isLoading: isLoadingCom,
    error,
  } = useQuery({
    queryKey: ["commission", { id: id }],
    queryFn: () => fetchCommission(id),
  });

  const {
    data: images,
    isLoading: isLoadingRef,
    error: errorRef,
  } = useQuery({
    queryKey: ["reference-images", { id: id }],
    queryFn: () => getReferenceImages(id),
  });

  if (isLoadingCom || isLoadingRef) {
    return <div>Loading</div>;
  }

  const buttonDecider = (status) => {
    if (status === "Pending") {
      return (
        <div className="flex p-3 w-full justify-center gap-x-3">
          <button className="p-2 bg-red-200 rounded-md">Decline</button>
          <button
            className="p-2 bg-blue-200 rounded-md"
            onClick={() => updateCommissionStatus(id, "Accepted", navigate)}
          >
            Accept
          </button>
        </div>
      );
    } else if (status === "Accepted") {
      return (
        <div className="flex p-3 w-full justify-center gap-x-3">
          <button
            className="m-3 p-2 bg-blue-200 rounded-md"
            onClick={() => updateCommissionStatus(id, "In Progress", navigate)}
          >
            Start Progress
          </button>
        </div>
      );
    } else if (status === "In Progress") {
      return (
        <div className="flex p-3 w-full justify-center gap-x-3 rounded-md">
          <button
            className="m-3 p-2 bg-green-200"
            onClick={() => updateCommissionStatus(id, "Completed", navigate)}
          >
            Complete
          </button>
        </div>
      );
    }
  };

  return (
    <AdminBaseLayout>
      <div className="p-5">
        <div className="flex items-center">
          <ArrowLeft
            size={40}
            className="hover:bg-blue-200 rounded-full p-1"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="grid py-1">From: {data.author.username}</div>
        <div className="grid py-1">
          {data.commission_size} - {data.commission_style}
        </div>
        <div className="grid grid-cols-5 gap-x-2">
          {images &&
            images.map((image, index) => {
              const imageUrl = image.image;
              return (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Reference ${index + 1}`}
                  className="rounded-md"
                />
              );
            })}
        </div>
        <div className="p-3 border-1 border-gray-300 mt-3 rounded-md">
          {data.notes}
        </div>
        {buttonDecider(data.status)}
        <div className="grid grid-cols-5">
          <div></div>
        </div>
      </div>
    </AdminBaseLayout>
  );
};

export default ViewCommission;
