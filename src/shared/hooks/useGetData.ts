import { useQuery } from "@tanstack/react-query";
import { dataService } from "../../core/service/data";

export function useGetData() {
  const {
    isLoading,
    data: err_data,
    error,
  } = useQuery({
    queryKey: ["err_data"],
    queryFn: async() => {
        const response = await dataService.getApiData();
        return response.data.data.category.frontPage;
    },
    retry: false,
  });

  return { isLoading, error, err_data };
}