import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="bg-blue-800 py-10 bottom-0  w-full">
      <div className="container mx-auto  flex justify-between items-center">
        <span className="text-5xl text-white font-bold">Holidays.com</span>
        <span className="text-white font-bold tracking-tight items-center justify-center flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
