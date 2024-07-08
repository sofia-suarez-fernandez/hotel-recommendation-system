import { useEffect, useState } from "react";
import axios from "../../axios";

const useAxios = (axiosParams) => {
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

  useEffect(() => {
    fetchData(axiosParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, loading };
};

export default useAxios;
