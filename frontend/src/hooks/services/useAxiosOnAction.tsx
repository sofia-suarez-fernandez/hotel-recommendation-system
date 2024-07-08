import { useState } from "react";
import axios from "../../axios";

const useAxiosOnAction = (axiosParams) => {
  const [response, setResponse] = useState<any>(undefined);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetch: () => fetchData(axiosParams) };
};

export default useAxiosOnAction;
