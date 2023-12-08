import React, { createContext, useContext, useState } from "react";

interface ReviewContextProps {
  environment_id: string | null;
  setEnvironment_id: React.Dispatch<React.SetStateAction<string | null>>;
  inspectiontarget_id: string | null;
  setInspectiontarget_id: React.Dispatch<React.SetStateAction<string | null>>;
}

const ReviewContext = createContext<ReviewContextProps>({
  environment_id: null,
  setEnvironment_id: () => null,
  inspectiontarget_id: null,
  setInspectiontarget_id: () => null,
});

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [environment_id, setEnvironment_id] = useState<string | null>(null);
  const [inspectiontarget_id, setInspectiontarget_id] = useState<string | null>(null);

  return (
    <ReviewContext.Provider value={{ environment_id, inspectiontarget_id, setEnvironment_id, setInspectiontarget_id }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);