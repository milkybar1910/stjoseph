import React from "react";
import { API } from "../../backend";

const ImageInternHelper = ({ course }) => {
  const ImageUrl = `${API}/course/certificate/${course._id}`;

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

export default ImageInternHelper;
