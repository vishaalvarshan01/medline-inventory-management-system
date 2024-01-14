import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { errorState } from "../context/store";

const ErrorAlert = ({ errorMsg }) => {
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    setError({ status: true, message: errorMsg });

    const timeoutId = setTimeout(() => {
      setError({ status: false, message: "" });
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMsg, setError]);

  return (
    <div>
      {error.status && (
        <div className="fixed top-3 left-0 right-0 mx-auto p-4 alert alert-error w-[500px] flex justify-center items-center text-center">
          <span>Error! {errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default ErrorAlert;
