import { useEffect } from "react";
import { successState } from "../context/store";
import { useRecoilState } from "recoil";

const SuccessAlert = ({ successMsg }) => {
  const [success, setSuccess] = useRecoilState(successState);

  useEffect(() => {
    setSuccess({ status: true, message: successMsg });

    const timeoutId = setTimeout(() => {
      setSuccess({ status: false, message: "" });
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMsg, setSuccess]);

  return (
    <div>
      {success.status && (
        <div
          role="alert"
          className="fixed top-3 left-0 right-0 mx-auto p-4 alert alert-success w-[500px] flex justify-center items-center text-center"
        >
          <span>Success! {successMsg}</span>
        </div>
      )}
    </div>
  );
};

export default SuccessAlert;
