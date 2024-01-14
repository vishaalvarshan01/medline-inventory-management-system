import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import { successState, errorState } from "../context/store";
import { useNavigate } from "react-router-dom";
import ConfirmationModel from "../components/ConfirmationModel";
import BackButton from "../components/BackButton";
const EditIssuePage = () => {
  const navigate = useNavigate();

  const { issueId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [editedIssue, setEditedIssue] = useState({
    issue: "",
    priorityLevel: 1,
    assignedBy: "",
    assignedTo: "",
    createdAt: "",
    dueDate: "",
    status: "completed",
    description: "",
  });
  const [success, setSuccess] = useRecoilState(successState);
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const { data: issueData, error } = await supabase
          .from("issues")
          .select("*")
          .eq("id", issueId)
          .single();

        if (error) {
          setError({ status: true, message: error.message });
          console.log(error);
        } else {
          console.log(issueData);
          setEditedIssue(issueData);
        }
      } catch (error) {
        setError({ status: true, message: error.message });
      }
    };

    fetchIssue();
  }, [issueId, setError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editedIssue) {
      // Handle the case where editedIssue is not loaded yet
      return;
    }

    const { error } = await supabase
      .from("issues")
      .update({
        issue: editedIssue.issue,
        description: editedIssue.description,
        priorityLevel: editedIssue.priorityLevel,
        assignedBy: editedIssue.assignedBy,
        assignedTo: editedIssue.assignedTo,
        createdAt: editedIssue.createdAt,
        dueDate: editedIssue.dueDate,
        status: editedIssue.status,
      })
      .eq("id", editedIssue.id);

    if (!error) {
      setSuccess({ status: true, message: "Issue updated successfully" });
      navigate(-1);
    } else {
      setError({ status: true, message: error.message });
      navigate(-1);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4 h-full">
      {error.status && <ErrorAlert errorMsg={error.message} />}
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold ">Edit Issue</h1>
        <BackButton />
      </div>
      <div className="bg-white rounded-lg w-[400px]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue
              </label>
              <input
                type="text"
                name="issue"
                value={editedIssue?.issue}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows="2"
                cols="10"
                name="description"
                value={editedIssue?.description || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <input
                type="number"
                name="priorityLevel"
                value={editedIssue?.priorityLevel}
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
                value={editedIssue?.assignedBy}
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
                value={editedIssue?.assignedTo}
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
                value={editedIssue?.createdAt}
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
                value={editedIssue?.dueDate}
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
                value={editedIssue?.status}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md bg-gray-200 text-black"
              />
            </div>
            <div className="flex justify-around">
              <button
                type="button"
                onClick={() => setShowModal(true)}
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
          </div>
        </form>
      </div>
      <ConfirmationModel isOpen={showModal} onClose={closeModal} />
    </div>
  );
};

export default EditIssuePage;
