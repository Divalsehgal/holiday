import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitySection from "./FacilitySection";
import GuestSection from "./GuestSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  facilities: string[];
  starRating: number;
  lastUpdate: Date;
  imageUrls: string[];
};

function ManageHotelForm() {
  const formMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <HotelDetailsSection />
        <TypeSection/>
        <FacilitySection/>
        <GuestSection/>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
