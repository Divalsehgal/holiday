import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
export const TypeSectionProps = {};
function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="font-bold mb-3 text-2xl">Type</h2>
      <div className="flex flex-wrap gap-2">
        {hotelTypes.map((type) => {
          return (
            <label
              className={
                typeWatch === type
                  ? "cursor-pointer bg-blue-300 rounded-full text-sm px-4 py-2 font-semibold"
                  : "cursor-pointer bg-gray-300 rounded-full text-sm px-4 py-2 font-semibold"
              }
            >
              <input
                type="radio"
                value={type}
                {...register("type", { required: "This field is required" })}
                className="hidden"
              />
              <span>{type}</span>
            </label>
          );
        })}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default TypeSection;
