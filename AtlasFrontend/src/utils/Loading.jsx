import React from "react";
import { Stethoscope } from "lucide-react";

const Loading = (
{
    msg="Please wait data is loading"
}
) => {
return ( 
<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
           
    
    <div className="flex flex-col items-center">

    {/* Animated Medical Icon */}
    <div className="relative flex items-center justify-center">
      
      {/* Outer Ring */}
      <div className="absolute h-16 w-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />

      {/* Icon Container */}
      <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
        <Stethoscope
          size={23}
          strokeWidth={2}
          className="text-emerald-600"
        />
      </div>
    </div>

    {/* Loading Text */}
    <div className="mt-6 text-center">
      <p className="text-sm font-semibold text-gray-700">
        Loading
        <span className="inline-flex ml-1">
          <span className="animate-bounce [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </span>
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {msg}
      </p>
    </div>
  </div>
</div>

);
};

export default Loading;
