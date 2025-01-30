import React from "react";
import Database from "../data/Database";
const Marketplace = () => {
  return (
    <div className=" grid grid-cols-4 gap-5 px-10">
      {Database &&
        Database?.map((user, index) => (
          <div key={index}>
            <h2>{user.bussinessName}</h2>
            <p>{user.businessSector}</p>
          </div>
        ))}
    </div>
  );
};

export default Marketplace;
