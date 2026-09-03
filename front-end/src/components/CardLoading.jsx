import React from "react";

const CardLoading = () => {
  return (
    <div className="border py-2 lg:p-4 gap-2 dark:bg-gray-500/30 border-gray-300 dark:border-transparent lg:min-w-52 grid lg:gap-4 min-w-auto rounded cursor-pointer bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="min-h-24 bg-blue-100 rounded" />

      {/* Title Placeholder */}
      <div className="p-2 lg:p-3 bg-blue-100 rounded w-20" />

      {/* Description Placeholder */}
      <div className="p-2 lg:p-3 bg-blue-100 rounded" />

      {/* Price Placeholder */}
      <div className="p-2 lg:p-3 bg-blue-100 rounded w-14" />

      {/* Action Buttons Placeholder */}
      <div className="flex justify-between items-center gap-3">
        <div className="p-2 lg:p-3 bg-blue-100 rounded w-20" />
        <div className="p-2 lg:p-3 bg-blue-100 rounded w-20" />
      </div>
    </div>
  );
};

export default CardLoading;
