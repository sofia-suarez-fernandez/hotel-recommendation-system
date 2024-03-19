import { CountryCity } from "../../../interfaces/hotel";
import useAxios from "../useAxios";

const useCountryCity = () => {
  const { response, loading } = useAxios({
    method: "GET",
    url: `/hotels/cities`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const countryCitySorted: CountryCity[] =
    response &&
    response.sort(
      (a, b) =>
        a.country.localeCompare(b.country) || a.city.localeCompare(b.city)
    );

  return { response: countryCitySorted, loading };
};

export default useCountryCity;
