import React, { useEffect, useState } from "react";
import api from "../../api.js";
import AdminBaseLayout from "./AdminBaseLayout.jsx";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const fetchPendingCommissions = async (filter) => {
  return api.get("api/commissions/?status=Pending").then((res) => res.data);
};

const fetchAcceptedCommissions = async (filter) => {
  return api.get("api/commissions/?status=Accepted").then((res) => res.data);
};

const fetchInProgressCommissions = async (filter) => {
  return api.get("api/commissions/?status=In Progress").then((res) => res.data);
};

const fetchCompletedCommissions = async (filter) => {
  return api.get("api/commissions/?status=Completed").then((res) => res.data);
};

const calculateEarnings = (coms) => {
  let total = 0;
  for (const com of coms) {
    total += com.price;
  }
  return total;
};

const AdminHomepage = () => {
  const {
    data: pCom,
    isLoading: isLoadingPCom,
    error: errPCom,
  } = useQuery({
    queryKey: ["commissions", { status: "Pending" }],
    queryFn: fetchPendingCommissions,
  });

  const {
    data: aCom,
    isLoading: isLoadingACom,
    error: errACom,
  } = useQuery({
    queryKey: ["commissions", { status: "Accepted" }],
    queryFn: fetchAcceptedCommissions,
  });

  const {
    data: iPCom,
    isLoading: isLoadingIpCom,
    error: errIpCom,
  } = useQuery({
    queryKey: ["commissions", { status: "In Progress" }],
    queryFn: fetchInProgressCommissions,
  });

  const {
    data: cCom,
    isLoading: isLoadingCCom,
    error: errCCom,
  } = useQuery({
    queryKey: ["commissions", { status: "Completed" }],
    queryFn: fetchCompletedCommissions,
  });

  if (isLoadingPCom || isLoadingACom || isLoadingIpCom || isLoadingCCom) {
    return <AdminBaseLayout>
      <div>Loading</div>
    </AdminBaseLayout>;
  }

  const allCommissions = [...pCom, ...aCom, ...iPCom, ...cCom];
  const card_values = [
    { value: pCom.length, desc: "Pending" },
    { value: aCom.length, desc: "Accepted" },
    { value: iPCom.length, desc: "In Progress" },
    { value: cCom.length, desc: "Completed" },
    { value: calculateEarnings(cCom), desc: "Earned" },
  ];

  const cSizeChartData = allCommissions.reduce((acc, item) => {
    if (!acc[item.commission_size]) {
      acc[item.commission_size] = {
        commission_size: item.commission_size,
        tip: item.tip,
        price: item.price,
      };
    } else {
      acc[item.commission_size].tip += item.tip;
      acc[item.commission_size].price += item.price;
    }
    return acc;
  }, {});

  const cStyleChartData = allCommissions.reduce((acc, item) => {
    if (!acc[item.commission_style]) {
      acc[item.commission_style] = {
        commission_style: item.commission_style,
        tip: item.tip,
        price: item.price,
      };
    } else {
      acc[item.commission_style].tip += item.tip;
      acc[item.commission_style].price += item.price;
    }
    return acc;
  }, {});

  return (
    <AdminBaseLayout>
      <div className={`grid grid-cols-${card_values.length} gap-x-10  mx-10 mt-5`}>
        {card_values.map((instance, id) => {
          return (
            <div className="p-3 bg-blue-100 rounded-xl" key={id}>
              <p className="font-bold text-4xl">{instance.value}</p>
              <p>{instance.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 mx-10 gap-x-10">
        <div className="col-span-3 my-10 bg-blue-100 border-gray rounded-xl p-4 tex-center items-center">
          <div className="font-bold text-center">
            Earnings Per Commission Size
          </div>
          <BarChart
            width={400}
            height={400}
            data={Object.values(cSizeChartData)}
          >
            <CartesianGrid strokeDasharray="6 6" />
            <XAxis dataKey="commission_size" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" stackId="a" fill="#2562dc" />
            <Bar dataKey="tip" stackId="a" fill="#2599dc" />
          </BarChart>
        </div>
        <div className="col-span-4 my-10 bg-blue-100 border-gray rounded-xl p-4">
          <div className="font-bold text-center">
            Earnings Per Commission Style
          </div>

          <BarChart
            width={600}
            height={400}
            data={Object.values(cStyleChartData)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="commission_style" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" stackId="a" fill="#2562dc" />
            <Bar dataKey="tip" stackId="a" fill="#2599dc" />
          </BarChart>
        </div>
      </div>
    </AdminBaseLayout>
  );
};

export default AdminHomepage;
