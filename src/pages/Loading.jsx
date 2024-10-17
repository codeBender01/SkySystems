import React from "react";

import loading from "../assets/Sky White BG.mp4";

export default function Loading() {
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <video autoPlay loop muted src={loading}></video>
    </div>
  );
}
