import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdminBaseLayout from "../AdminBaseLayout.jsx";

async function fetchCommission(id) {
  const res = await api.get(`api/commissions/${id}`);
  return res.data;
}

async function getReferenceImages(id) {
  const res = await api.get(`api/commission/reference-images/${id}`);
  return res.data;
}

const ViewRef = () => {
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

  return (
    <AdminBaseLayout>
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
      </div>
    </AdminBaseLayout>
  );
};

export default ViewRef;
