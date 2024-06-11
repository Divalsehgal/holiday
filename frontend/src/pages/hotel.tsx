import { useMutation } from "react-query";
import ManageHotelForm from "../form/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      showToast({
        message: "Hotel Added Successfully",
        type: "SUCCESS",
      });
    },
    onError: function (error: Error) {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    console.log("hotelFormData", hotelFormData);
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
}

export default AddHotel;
