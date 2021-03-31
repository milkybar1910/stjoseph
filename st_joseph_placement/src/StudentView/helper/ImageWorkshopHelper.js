import React from "react";
import { API } from "../../backend";

const ImageWorkshopHelper = ({ workshop }) => {
  const ImageUrl = `${API}/workshop/certificate/${workshop._id}`;

  return (
    <div>
      <img
        src={ImageUrl}
        alt="loading..."
        className="card-img "
        width={230}
        height={230}
      />
    </div>
  );
};

export default ImageWorkshopHelper;
