import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestSection() {

  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="font-bold mb-3 text-2xl">Guests</h2>
      <div className=" flex bg-gray-200 p-6 gap-2">
        <label className="flex flex-1 gap-1 flex-col text-sm text-gray-700">
          {"Adults"}
          <input
            type="number"
            min={1}
            className="border-1 border-gray-500 rounded w-full px-3 py-2 font-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />

          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm text-gray-700">
          {"Children"}
          <input
            type="number"
            min={0}
            className="border-1 border-gray-500 rounded w-full px-3 py-2 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          />

          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestSection;
