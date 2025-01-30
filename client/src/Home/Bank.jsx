import React from 'react'
import { BiSolidBank } from "react-icons/bi";

const Bank = () => {
  return (
    <div>
      <div className=" overflow-hidden relative bg-gray-100 w-full h-60">
        <p className=' text-6xl font-bold absolute top-10 left-5 text-gray-600'>Bank of BIT</p>
        <BiSolidBank  className=' text-gray-600 -bottom-24 right-20 absolute size-80 '/>
      </div>
    </div>
  );
}

export default Bank