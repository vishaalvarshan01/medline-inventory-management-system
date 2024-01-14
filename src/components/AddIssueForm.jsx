import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';

import ErrorAlert from "./ErrorAlert";
import supabase from "../supabaseClient";
import { successState,errorState } from "../context/store";
const AddIssueForm = () => {
  const navigate = useNavigate();

  const [success,setSuccess] = useRecoilState(successState);
  const [error,setError] = useRecoilState(errorState);

  const [issue,setIssue] = useState({
    issue: "",
    priorityLevel: 1,
    assignedBy: "",
    assignedTo: "",
    createdAt: "",
    dueDate: "",
    status: "pending",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the update operation here using supabase
    // You may need to adjust the actual update logic based on your Supabase schema
    const { error } = await supabase
      .from("issues")
      .insert({
        issue: issue.issue,
        priorityLevel: issue.priorityLevel,
        assignedBy: issue.assignedBy,
        assignedTo: issue.assignedTo,
        createdAt: issue.createdAt,
        dueDate: issue.dueDate,
        status: issue.status,
      });
    if (!error) {
      navigate(-1);
      setSuccess({ status: true, message: "Issue added successfully" });
    }else{
      setError({ status: true, message: error.message });
      console.log(error)
    }
  }

  return (
    <div className="p-4 w-full h-full bg-slate-50">
      {error.status && <ErrorAlert errorMsg={error.message} />}
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold ">Add Issue</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue
            </label>
            <input
              type="text"
              name="issue"
              value={issue.issue}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <input
              type="number"
              name="priorityLevel"
              value={issue.priorityLevel}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              type="datetime-local"
              name="createdAt"
              value={issue.createdAt}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={issue.dueDate}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assigned By
            </label>
            <input
              type="text"
              name="assignedBy"
              value={issue.assignedBy}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assigned To
            </label>
            <input
              type="text"
              name="assignedTo"
              value={issue.assignedTo}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={issue.status}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md bg-gray-200 text-black w-[400px]"
            />
          </div>
          <button type="submit" className="w-[400px] border-2 rounded-lg py-2">
            Add Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIssueForm;
