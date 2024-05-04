import { hotelFacilities } from "../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
import { useFormContext } from "react-hook-form";


function FacilitySection() {
  const {
    register,
     formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="font-bold mb-3 text-2xl">Facility</h2>
      <div className="grid grid-cols-4  gap-2">
        {hotelFacilities.map((facility) => {
          return (
            <label key={facility} className="flex gap-1 text-sm text-gray-700">
              <input
                type="checkbox"
                value={facility}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities?.length > 0) {
                      return true;
                    } else {
                      return "At least one facility is required";
                    }
                  },
                })}
              />
              {facility}
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default FacilitySection;
