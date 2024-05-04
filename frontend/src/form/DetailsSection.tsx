 import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { HotelFormData } from "./ManageHotelForm";

type Props = {};

function HotelDetailsSection({}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  //   const mutation = useMutation(apiClient.sigin, {
  //     onSuccess: async function () {
  //       showToast({
  //         message: "Login Successfully",
  //         type: "SUCCESS",
  //       });
  //       await queryClient.invalidateQueries("validateToken");

  //       navigate("/");
  //     },
  //     onError: function (error: Error) {
  //       showToast({
  //         message: error.message,
  //         type: "ERROR",
  //       });
  //     },
  //   });
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label htmlFor="name" className="text-gray-700 font-bold text-sm flex-1">
        Name
        <input
          type="text"
          id="name"
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name && (
          <span className="text-red-500">{errors?.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label
          htmlFor="city"
          className="text-gray-700 font-bold text-sm flex-1"
        >
          City
          <input
            type="text"
            id="city"
            className="rounded border w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors?.city && (
            <span className="text-red-500">{errors?.city.message}</span>
          )}
        </label>

        <label
          htmlFor="country"
          className="text-gray-700 font-bold text-sm flex-1"
        >
          Country
          <input
            type="text"
            id="country"
            className="rounded border w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors?.country && (
            <span className="text-red-500">{errors?.country.message}</span>
          )}
        </label>
      </div>

      <label
        htmlFor="description"
        className="text-gray-700 font-bold text-sm flex-1"
      >
        Description
        <textarea
          id="description"
          rows={10}
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description && (
          <span className="text-red-500">{errors?.description.message}</span>
        )}
      </label>

      <label
        htmlFor="pricePerNight"
        className="text-gray-700 font-bold text-sm max-w-[50%]"
      >
        Price Per Night
        <input
          type="number"
          id="pricePerNight"
          min={1}
          className="rounded border w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors?.pricePerNight && (
          <span className="text-red-500">{errors?.pricePerNight.message}</span>
        )}
      </label>

      <label
        htmlFor="starRating"
        className="text-gray-700 font-bold text-sm max-w-[50%]"
      >
        Star Rating
        <select
          id="starRating"
          min={1}
          className="rounded border w-full py-1 px-2 text-gray-700 font-normal"
          {...register("starRating", { required: "This field is required" })}
        >
          <option value="">Select as Rating</option>
          {[1, 2, 3, 4, 5].map((value) => {
            return <option value={value}>{value}</option>;
          })}
        </select>
        {errors?.starRating && (
          <span className="text-red-500">{errors?.starRating.message}</span>
        )}
      </label>
    </div>
  );
}

export default HotelDetailsSection;
