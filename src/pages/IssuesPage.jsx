import { useRecoilValue } from "recoil";
import IssuesTable from "../components/IssuesTable";
import ErrorAlert from "../components/ErrorAlert";
import { errorState, successState } from "../context/store";
import SuccessAlert from "../components/SuccessAlert";

const IssuesPage = () => {
  const error = useRecoilValue(errorState);
  const success = useRecoilValue(successState);

  return (
    <div className="p-4 w-full h-full bg-slate-50">
      {success.status && <SuccessAlert successMsg={success.message} />}
      {error.status && <ErrorAlert errorMsg={error.message} />}
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold ">Issues Page</h1>
      </div>

      <div className="py-6">
        <IssuesTable />
      </div>
      
    </div>
  );
};

export default IssuesPage;
