import AdminBaseLayout from "../AdminBaseLayout.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api.js";
import Pending from './Pending.jsx';
import Accepted from './Accepted.jsx';
import InProgress from './InProgress.jsx';
import Completed from './Completed.jsx';

async function fetchCommission(id) {
  const res = await api.get(`api/commissions/${id}`);
  return res.data;
}

async function getReferenceImages(id) {
  const res = await api.get(`api/commission/reference-images/${id}`);
  return res.data;
}


const ViewCommission = () => {
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

  const renderView = (data, images) => {
    switch (data.status) {
      case "Pending":
        return <Pending data={data} images={images}/>
      case "Accepted":
        return <Accepted data={data} images={images}/>
      case "In Progress":
        return <InProgress data={data} images={images}/>
      case "Completed":
        return <Completed data={data} images={images}/>
      default:
        return <div>Not found</div>
    }
  }

  return (
    <AdminBaseLayout>
      {renderView(data, images)}
    </AdminBaseLayout>
  );
};

export default ViewCommission;
