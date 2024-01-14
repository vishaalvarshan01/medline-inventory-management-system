import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import supabase from "../supabaseClient";
import { errorState,loadingState } from "../context/store";
import BackButton from "../components/BackButton";
const IssuePage = () => {
  const { issueId } = useParams();

  const [errror,setError] = useRecoilState(errorState);
  const [loading,setLoading] = useRecoilState(loadingState);

  const [issue,setIssue] = useState({});

  useEffect(() => {
    setLoading(true);

    const getIssue = async () => {
        const { data, error } = await supabase
          .from("issues")
          .select("*")
          .eq("id", issueId);
        console.log(data);

        if (error) {
          setLoading(false);
          setError({ status: true, message: error.message });
        }

        setLoading(false);
        setIssue(data[0]);
    }
    
    getIssue();

    return () => {
        
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold ">Issue Id : {issue.id}</h1>
        <BackButton />
      </div>
    </div>
  );
};

export default IssuePage;
