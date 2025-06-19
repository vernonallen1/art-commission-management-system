import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

async function updateCommissionStatus(id, status, navigate) {
  const res = await api.patch(`api/commissions/${id}`, { status: status });
  toast.success(`Successfully set commission's status to ${status}`);
  const username = localStorage.getItem("username");
  create_log(
    "Commission Status Update",
    `${username} updated commission status to ${status}.`
  );
  navigate(-1);
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

const Pending = (props) => {
  const { data, images } = props;
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="flex items-center">
        <ArrowLeft
          size={40}
          className="hover:bg-blue-200 rounded-full p-1"
          onClick={() => navigate(-1)}
        />
        <p className="font-bold text-2xl p-4">
          ID: {data.id} | {data.commission_size} - {data.commission_style}
        </p>
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
      <div className="flex p-3 w-full justify-center gap-x-3">
        <button className="p-2 bg-red-200 rounded-md">Decline</button>
        <button
          className="p-2 bg-blue-200 rounded-md"
          onClick={() => updateCommissionStatus(id, "Accepted", navigate)}
        >
          Accept
        </button>
      </div>
      <div className="grid grid-cols-5">
        <div></div>
      </div>
    </div>
  );
};

export default Pending;
