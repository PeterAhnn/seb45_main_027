import React from "react";
import AllHeader from "./AllHeader";
import AllContent from "./AllContent";

const All = ({ viewportWidth, setViewportWidth, showroomData }) => {
  return (
    <div className="flex-col mt-20">
      <AllHeader
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
      />
      <AllContent
        viewportWidth={viewportWidth}
        setViewportWidth={setViewportWidth}
        showroomData={showroomData}
      />
    </div>
  );
};

export default All;