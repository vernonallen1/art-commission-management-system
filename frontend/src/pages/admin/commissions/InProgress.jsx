import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../api.js";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function getStatusImages(id) {
  const res = await api.get(`commission/progress/${id}`);
  return res.data;
}

const InProgress = (props) => {
  const progressStatus = ["Sketch", "Line Art", "Render"];
  const [selectedProgress, setSelectedProgressStatus] = useState(
    progressStatus[0]
  );
  const [progressImageStatus, setProgressImageStatus] = useState({});
  const [description, setDescription] = useState("");
  const { data, images } = props;
  const navigate = useNavigate();

  const {
    data: progressImages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["progress-images", { id: data.id }],
    queryFn: () => getStatusImages(data.id),
    retry: false,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  const uploadImageWithImageData = async (imageData, commissionId) => {
    const formData = new FormData();
    formData.append("commission", commissionId);
    formData.append("image", imageData.file);
    formData.append("status_progress", selectedProgress);
    formData.append("description", description);

    formData.forEach((val, key) => console.log(key, val));
    try {
      const res = await api.post(
        `/api/commission/progress/${commissionId}`,
        formData
      );
      if (res.status === 201) {
        toast.success(
          `Image for status (${selectedProgress}) uploaded successfully.`
        );
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (err) {
      toast.error(err.message || "Error uploading image");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = { file, preview: reader.result };
      setProgressImageStatus((prev) => ({
      ...prev,
      [selectedProgress]: imageData,
    }));
      uploadImageWithImageData(imageData, data.id);
    };
    reader.readAsDataURL(file);
  };

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
        <button className="ml-2 bg-blue-200 rounded-md p-1">View Ref</button>
      </div>
      <div className="flex">
        {progressStatus.map((status, index) => {
          return (
            <button
              className={`px-2 py-1 bg-blue-100 rounded-md m-2 ${
                selectedProgress === status ? "border-2 border-blue-500" : ""
              }`}
              key={index}
              onClick={() => {
                setSelectedProgressStatus(status);
              }}
            >
              {status}
            </button>
          );
        })}
      </div>
      {!progressImages && (
        <div className="flex justify-center items-center h-[300px] border-1 border-gray-300 bg-gray-100 rounded-xl m-2">
          {progressImageStatus[selectedProgress] && (
            <img
              src={progressImageStatus[selectedProgress].preview}
              alt={`Uploaded`}
              className="h-full rounded-md"
            />
          )}
          {!progressImageStatus[selectedProgress] && (
            <>
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="flex justify-center items-center bg-blue-300 rounded-md p-1">
                  Upload Image Status
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InProgress;
