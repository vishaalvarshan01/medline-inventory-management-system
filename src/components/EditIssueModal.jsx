import React, { useState } from "react";
import { useRecoilState } from "recoil";

import supabase from "../supabaseClient";
import { successState, errorState } from "../context/store";

const EditIssueModal = ({ issue, onClose, onEdit }) => {
  const [editedIssue, setEditedIssue] = useState(issue);

  const [success, setSuccess] = useRecoilState(successState);
  const [error, setError] = useRecoilState(errorState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the update operation here using supabase
    // You may need to adjust the actual update logic based on your Supabase schema
    const { error } = await supabase
      .from("issues")
      .update({
        issue: editedIssue.issue,
        priorityLevel: editedIssue.priorityLevel,
        assignedBy: editedIssue.assignedBy,
        assignedTo: editedIssue.assignedTo,
        createdAt: editedIssue.createdAt,
        dueDate: editedIssue.dueDate,
        status: editedIssue.status,
      })
      .eq("id", issue.id);

    if (!error) {
      setSuccess({ status: true, message: "Issue updated successfully" });
      // Trigger a callback to refresh the issues table or perform any other actions
      onEdit();
      onClose();
    } else {
      setError({ status: true, message: error.message });
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue
              </label>
              <input
                type="text"
                name="issue"
                value={editedIssue.issue}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <input
                type="number"
                name="priorityLevel"
                value={editedIssue.priorityLevel}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned By
              </label>
              <input
                type="text"
                name="assignedBy"
                value={editedIssue.assignedBy}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned To
              </label>
              <input
                type="text"
                name="assignedTo"
                value={editedIssue.assignedTo}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <input
                type="datetime-local"
                name="createdAt"
                value={editedIssue.createdAt}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={editedIssue.dueDate}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                name="status"
                value={editedIssue.status}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border-2 rounded-md bg-gray-200 text-black hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssueModal;
