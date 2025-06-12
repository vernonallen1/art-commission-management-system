import React, { useState, useEffect } from "react";
import BaseLayout from "./BaseLayout";
import { Plus, X, CircleCheckBig } from "lucide-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api.js";

const CommissionForm = () => {
  const navigate = useNavigate();
  const commissionSizes = ["Full Body", "Half Body", "Bust"];
  const commissionStyles = [
    "Sketch",
    "Line Art",
    "Flat-Colored",
    "Semi-Rendered",
  ];
  const paymentOptions = [
    { value: "paypal", label: "Paypal" },
    { value: "payeer", label: "Payeer" },
    { value: "visa", label: "Visa" },
    { value: "mastercard", label: "Mastercard" },
    { value: "bitcoin", label: "Bitcoin" },
  ];
  const prices = {
    "Flat-Colored": [25, 20, 15],
    "Semi-Rendered": [30, 25, 20],
    "Line Art": [35, 30, 25],
    Sketch: [40, 35, 30],
  }; 

  const [progress, setProgress] = useState(1);
  const [commissionSize, setCommissionSize] = useState("");
  const [commissionStyle, setCommissionStyle] = useState("");
  const [referenceImages, setReferenceImages] = useState([]);
  const [note, setNote] = useState("");
  const [paymentService, setPaymentService] = useState(paymentOptions[0]);
  const [tip, setTip] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (commissionSize !== "" && commissionStyle !== "") {
      setPrice(prices[commissionStyles[commissionStyle]][commissionSize]);
    }
  }, [commissionStyle, commissionSize]);

  const returnHome = () => {
    navigate("/");
  };

  const handlePaymentServiceChange = (option) => {
    setPaymentService(option);
  };

  const changeTip = (tip) => {
    setTip(tip);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setReferenceImages((prev) => [...prev, ...files].slice(0, 4));
  };

  const createCommission = async (e) => {
    const data = {
      commission_size: commissionSizes[commissionSize],
      commission_style: commissionStyles[commissionStyle],
      notes: note,
      tip: tip,
      price: price,
    };
    e.preventDefault();
    try {
      const res = await api.post("/api/commissions/", data);
      if (res.status === 201) {
        return res.data; // Return the created commission
      } else {
        toast.error("Failed to create commission appointment");
        return null;
      }
    } catch (error) {
      toast.error(error.message || "Error creating commission");
      return null;
    }
  };

  const create_log = async () => {
    const username = localStorage.getItem("username");
    api.post("/api/logs/", {kind: "Commission Create", message: `${username} created commissions.`});
    if (res.status === 201) {
        return toast.success("Logged commission create."); // Return the created commission
      } else {
        toast.error("Failed to create commission log.");
        return null;
      }
  } 

  const next = () => {
    if (progress === 1 && (commissionSize === "" || commissionStyle === "")) {
      if (commissionSize === "") toast.error("Please select commmission size!");
      if (commissionStyle === "")
        toast.error("Please select commission style!");
    } else if (
      progress === 2 &&
      (referenceImages.length === 0 || note === "")
    ) {
      if (referenceImages.length === 0)
        toast.error("Please upload reference images!");
      if (note === "") toast.error("Please input note for reference!");
    } else {
      setProgress(progress + 1);
    }
  };

  const uploadImage = async (e, commissionId) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("commission", commissionId); // ADD THIS

    referenceImages.forEach((imgObj) => {
      formData.append("image", imgObj.file);
    });

    try {
      const res = await api.post(
        `/api/commission/reference-images/${commissionId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (res.status === 201) {
        toast.success("Reference images uploaded successfully.");
      } else {
        toast.error("Failed to upload images.");
      }
    } catch (err) {
      toast.error(err.message || "Error uploading images");
    }
  };

  const back = () => {
    if (progress === 1) {
      navigate("/");
    } else {
      setProgress(progress - 1);
    }
  };

  const progressBar = () => {
    return (
      <div class="flex items-center w-full pr-10 z-0">
        <span class="text-lg col-span-2 text-center whitespace-nowrap font-bold">
          Choose Commission
        </span>
        <div class="flex items-center w-full mx-2">
          <span class="h-3 w-3 rounded-full bg-black border-2"></span>
          <div
            class={`flex-grow h-0.5  ${
              progress < 2 ? "bg-gray-400" : "bg-black"
            }`}
          ></div>
          <span
            class={`h-3 w-3 rounded-full border-2 ${
              progress < 2 ? "border-gray-400 bg-white" : "bg-black"
            }`}
          ></span>
        </div>
        <span
          class={`text-lg col-span-2 text-center whitespace-nowrap font-bold ${
            progress < 2 ? "text-gray-400" : ""
          }`}
        >
          Add Reference
        </span>
        <div class="flex items-center w-full mx-2">
          <span
            class={`h-3 w-3 rounded-full border-2 ${
              progress < 2 ? "border-gray-400 bg-white" : "bg-black"
            }`}
          ></span>
          <div
            class={`flex-grow h-0.5 border-gray-400 ${
              progress < 3 ? "bg-gray-400" : "bg-black"
            }`}
          ></div>
          <span
            class={`h-3 w-3 rounded-full border-2 ${
              progress < 3 ? "border-gray-400 bg-white" : "bg-black"
            }`}
          ></span>
        </div>
        <span
          class={`text-lg col-span-2 text-center whitespace-nowrap font-bold ${
            progress < 3 ? "text-gray-400" : ""
          }`}
        >
          Process Payment
        </span>
        <div class="flex items-center w-full mx-2">
          <span
            class={`h-3 w-3 rounded-full border-2 ${
              progress < 3 ? "border-gray-400 bg-white" : "bg-black"
            }`}
          ></span>
          <div
            class={`flex-grow h-0.5  ${
              progress < 4 ? "bg-gray-400" : "bg-black"
            }`}
          ></div>
          <span
            class={`h-3 w-3 rounded-full border-2 ${
              progress < 4 ? "border-gray-400 bg-white" : "bg-black"
            }`}
          ></span>
        </div>
        <span
          class={`text-lg col-span-2 text-center whitespace-nowrap font-bold ${
            progress < 4 ? "text-gray-400" : ""
          }`}
        >
          Finish Transaction
        </span>
      </div>
    );
  };

  const chooseCommission = () => {
    const isSelectedCommissionSize = (index, commissionSize) => {
      return index === commissionSize;
    };

    const isSelectedCommissionStyle = (index, commissionStyle) => {
      return index === commissionStyle;
    };

    return (
      <div>
        <div class="mt-5 grid grid-cols-3 w-full gap-x-8">
          {commissionSizes.map((name, index) => {
            return (
              <div
                key={index}
                class={`bg-gray-500 min-h-[200px] min-w-[200px] rounded-xl content-center text-center ${
                  isSelectedCommissionSize(index, commissionSize)
                    ? "border-blue-200 border-5 border-opacity-50"
                    : ""
                }`}
                onClick={() => setCommissionSize(index)}
              >
                {name}
              </div>
            );
          })}
        </div>
        <div class="mt-5 grid grid-cols-4 w-full gap-x-8">
          {commissionStyles.map((name, index) => {
            return (
              <div
                key={index}
                class={`bg-gray-500 min-h-[200px] min-w-[200px] rounded-xl content-center text-center ${
                  isSelectedCommissionStyle(index, commissionStyle)
                    ? "border-blue-200 border-5"
                    : ""
                }`}
                onClick={() => setCommissionStyle(index)}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const addReference = () => {
    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const limitedFiles = files.slice(0, 4 - referenceImages.length); // max 4

      const fileReaders = limitedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({ file, preview: reader.result });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then((newFileObjects) => {
        setReferenceImages((prev) => [...prev, ...newFileObjects]);
      });
    };

    const removeImage = (indexImage) => {
      setReferenceImages((prev) =>
        prev.filter((_, index) => index != indexImage)
      );
    };

    return (
      <div className="mt-5">
        <span className="text-lg font-bold">Add Photos (up to 4 images)</span>
        <div className="grid grid-cols-5 gap-x-4 p-4 bg-gray-200 rounded-xl">
          {referenceImages.map((imgObj, index) => (
            <div className="relative aspect-square" key={index}>
              <img
                src={imgObj.preview}
                alt={`Uploaded ${index + 1}`}
                className="object-cover w-full rounded-xl"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                title="Remove image"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}

          {referenceImages.length < 4 && (
            <div>
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="flex justify-center items-center bg-gray-500 aspect-square rounded-xl">
                  <Plus size={40} />
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
            </div>
          )}
        </div>

        <div className="mt-5 text-lg font-bold">Add Note</div>
        <textarea
          className="flex bg-gray-200 w-full rounded-xl resize-none p-4"
          rows="7"
          name=""
          id=""
          placeholder="I want to ...."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
    );
  };

  const processPayment = () => {
    return (
      <div className="mt-5">
        <label className="block mb-2 font-semibold">
          Change Payment Option
        </label>
        <Select
          options={paymentOptions}
          value={paymentService}
          onChange={handlePaymentServiceChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="mt-5 grid grid-cols-3 gap-5">
          <div>
            <span className="font-bold">Account Name:</span>
            <div className="rounded-md bg-gray-100 p-2">Jemuel Juatco</div>
          </div>
          <div>
            <span className="font-bold">Account Number:</span>
            <div className="rounded-md bg-gray-100 p-2">45302903</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-5">
          <div className="flex gap-x-5">
            <span className="font-bold content-center">Tip (optional):</span>
            <input
              type="number"
              min="0"
              className="rounded-md bg-gray-100 p-2"
              placeholder="$"
              onChange={(e) => changeTip(parseInt(e.target.value))}
              value={tip}
            />
          </div>
        </div>

        <div className="mt-5">
          <span className="font-bold">Transaction:</span>
          <div className="grid grid-cols-8 grid-rows-3 gap-x-5">
            <span className="font-medium row-span-3">Commission Availed: </span>
            <div>
              <p className="italic">{commissionSizes[commissionSize]}</p>
              <p className="italic">{commissionStyles[commissionStyle]}</p>
            </div>
            <div className="content-center col-span-6">
              <span className="">{price}</span>
            </div>
            <div className="italic">Tip</div>
            <div className="col-span-6">{tip}</div>
            <div className="font-bold">Total</div>
            <div className="font-bold">{price + tip}</div>
          </div>
        </div>

        <div className="italic">
          Send exactly ${price + tip}.00 to the account above.
        </div>
      </div>
    );
  };

  const finishTransaction = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full pt-10">
        <CircleCheckBig size={300} color="green" className="justify-center" />
        <span className="font-bold text-4xl pt-5">
          Commission Booking Complete!
        </span>
        <span className="text-xl">
          {commissionSizes[commissionSize]} -{" "}
          {commissionStyles[commissionStyle]}
        </span>
      </div>
    );
  };

  const formTransitionButtons = () => {
    return (
      <div class="flex justify-center py-10">
        {progress < 4 && (
          <button
            class="mr-8 p-3 min-w-[100px] rounded-xl bg-gray-300 font-bold"
            onClick={back}
          >
            {progress === 1 ? "Cancel" : "Back"}
          </button>
        )}
        <button
          className="bg-blue-500 min-w-[100px] rounded-xl font-bold p-3"
          onClick={async (e) => {
            if (progress === 4) {
              const commission = await createCommission(e);
              if (commission) {
                await uploadImage(e, commission.id);
              }
              create_log();
              returnHome();
            } else {
              next();
            }
          }}
        >
          {progress === 4 ? "Done" : "Next"}
        </button>
      </div>
    );
  };

  return (
    <BaseLayout>
      <div class="min-h-screen z- p-4">
        <div class="font-bold text-2xl py-4">Commission Form</div>
        {progressBar()}
        {progress === 1 && chooseCommission()}
        {progress === 2 && addReference()}
        {progress === 3 && processPayment()}
        {progress === 4 && finishTransaction()}
        {formTransitionButtons()}
      </div>
    </BaseLayout>
  );
};

export default CommissionForm;
