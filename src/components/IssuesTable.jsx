import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import EditIssueModal from "./EditIssueModal";
import { errorState, successState, loadingState } from "../context/store";
import supabase from "../supabaseClient";
import Loader from "./Loader";
import SpinnerIcon from "./SpinnerIcon";

const tableHeaders = [
  "No",
  "Issue",
  "Priority",
  "Assigned By",
  "Assignd To",
  "Created At",
  "Due Date At",
  "Status",
  "",
  ""
];

const IssuesTable = () => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [error, setError] = useRecoilState(errorState);
  const [success, setSuccess] = useRecoilState(successState);
  const [loading, setLoading] = useRecoilState(loadingState);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditClick = (e,issue) => {
    e.stopPropagation();
    navigate(`editIssue/${issue.id}`);
  };

  const handleCloseModal = () => {
    setSelectedIssue(null);
  };

  const getPriorityBadge = (priorityLevel) => {
    let badgeClass = "";
    let badgeText = "";

    if (priorityLevel === 1) {
      badgeClass = "badge-success";
      badgeText = "low";
    } else if (priorityLevel === 2) {
      badgeClass = "badge-warning";
      badgeText = "medium";
    } else if (priorityLevel > 2) {
      badgeClass = "badge-error";
      badgeText = "high";
    } else {
      badgeClass = "badge-error";
      badgeText = "none";
    }
    return (
      <div className={`badge ${badgeClass} gap-2 w-20 py-3`}>{badgeText}</div>
    );
  };

  const fetchIssues = async () => {
    try {
      setLoading(true);

      let { data: issuesData, error } = await supabase
        .from("issues")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(error.message);
        setError({ error: true, msg: error.message });
      } else {
        if (searchQuery.trim() !== "") {
          // If searchQuery is not empty, apply the search filter
          issuesData = issuesData.filter((issue) =>
            
            issue.id.toString().includes(searchQuery.trim())
          );
        }

        issuesData.forEach((issue) => {
          if (moment(issue.createdAt).isAfter(issue.dueDate)) {
            issue.status = "overdue❗️";
          }
        });

        setLoading(false);
        setError({ error: false, msg: "Issues fetched successfully" });
        setIssues(issuesData);
      }
    } catch (error) {
      setError({ error: true, msg: error.message });

      console.error("An error occurred during issue fetching:", error.message);
    }
  };

  const handleDeleteIssue = async (e,id) => {

    e.stopPropagation();
    try {
      const { error } = await supabase.from("issues").delete().eq("id", id);

      if (!error) {
        setSuccess({ status: true, message: "Issue deleted successfully" });
        setError({ status: false, message: "Issue deleted successfully" });
        fetchIssues();
      } else {
        setSuccess({ status: false, message: "Issue not deleted" });
        setError({ status: true, message: error.message });
      }
    } catch (error) {
      setSuccess({ status: false, message: "Issue not deleted" });
      setError({ status: true, message: error.message });
    }
  };

  useEffect(() => {
    fetchIssues();

    return () => {
      // clean up and unmount
    };
  }, [searchQuery]);

  useEffect(() => {
    // check if the issue's created At is more than due date
    issues.forEach((issue) => {
      if (moment(issue.createdAt).isAfter(issue.dueDate)) {
        issue.status = "overdue";
      }
    });

    return () => {
      
    }
  }, []);

  return (
    <div className="bg-white p-2 rounded-lg text-sm">
      <div className="flex justify-between">
        <div className="flex gap-x-2 mb-10">
          <button
            className="py-2 px-2 border-2 border-solid w-32 rounded-xl flex items-center gap-x-2.5"
            onClick={fetchIssues}
          >
            <SpinnerIcon loading={loading} />
            <div className="flex items-center gap-x-2 font-bold">Refresh</div>
          </button>
          <div>
            <input
              className="bg-white py-3 px-3 border-2 border-solid w-80 rounded-xl flex items-center gap-x-2.5"
              type="search"
              placeholder="Search by Issue Id"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div>
          <button
            className="py-3 px-2 border-2 border-solid w-36 rounded-xl flex items-center gap-x-3"
            onClick={() => navigate("addissue")}
          >
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/material-rounded/24/add.png"
              alt="add"
              className="ml-2"
            />
            <div className="flex items-center gap-x-2 font-bold">Add Issue</div>
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <table className="table w-full rounded-xl">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="text-black text-md font-bold h-10 py-5 bg-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.length == 0 && (
                <tr>
                  <td colSpan={9}>
                    <p className="text-center font-bold">No Issues Found</p>
                  </td>
                </tr>
              )}
              {issues.map((issue, index) => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-200 hover:cursor-pointer"
                  onClick={() => navigate(`${issue.id}`)}
                >
                  <th>{issue.id}</th>
                  <td className="">
                    <p className="w-[250px] overflow-auto">{issue.issue}</p>
                  </td>
                  <td>{getPriorityBadge(issue.priorityLevel)}</td>
                  <td>{issue.assignedBy}</td>
                  <td>{issue.assignedTo}</td>
                  <td className="">
                    {moment(issue.createdAt).format("MMM Do ")}
                  </td>
                  <td className="">
                    {moment(issue.dueDate).format("MMM Do ")}
                  </td>
                  <td
                    className={`${
                      issue.status == "overdue❗️"
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {issue.status}
                  </td>
                  <td>
                    <button
                      className="py-2 px-2 border-2 rounded-xl hover:bg-blue-500 hover:text-white"
                      onClick={(e) => handleEditClick(e, issue)}
                    >
                      <img
                        width="18"
                        height="18"
                        src="https://img.icons8.com/material-sharp/24/edit--v1.png"
                        alt="edit--v1"
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      className="py-2 px-2 border-2 rounded-xl hover:bg-red-500 hover:text-white"
                      onClick={(e) => handleDeleteIssue(e, issue.id)}
                    >
                      <img
                        width="18"
                        height="18"
                        src="https://img.icons8.com/material-rounded/24/filled-trash.png"
                        alt="filled-trash"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedIssue && (
        <EditIssueModal
          issue={selectedIssue}
          onClose={handleCloseModal}
          onEdit={fetchIssues}
        />
      )}
    </div>
  );
};

export default IssuesTable;
