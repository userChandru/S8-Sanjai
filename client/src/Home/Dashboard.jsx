import React from 'react'
import { IoMdAnalytics } from "react-icons/io";

const Dashboard = () => {
  return (
    <div>
      <div className=" mb-10 overflow-hidden relative bg-gray-100 w-full h-60">
        <div className=" space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Sales Analytics</p>
        </div>

        <IoMdAnalytics className=" text-gray-600 -bottom-10 right-20 absolute size-60 " />
      </div>
    </div>
  );
}

export default Dashboard