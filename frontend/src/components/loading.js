import React from "react";
import Lottie from "lottie-react";
import animationData from "../lotties/loading.json";

export const Loading = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        height: "300px",
        width: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        'Zindex': '10',
      }}
    >
      <Lottie
        animationData={animationData}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};
