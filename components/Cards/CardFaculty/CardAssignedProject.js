import React from "react";
import AssignedProject from "components/Facultyfolder/AssignedProject";

// components

export default function CardAssignedProject() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full p-8 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-base text-center  ">
                Assigned Projects
              </h3>
            </div>
          </div>
        </div>
        {/* content here */}
        <div>
          <AssignedProject />
        </div>
      </div>
    </>
  );
}
