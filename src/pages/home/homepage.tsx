/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetData } from "../../shared/hooks/useGetData";
// import { useScrollGradient } from "../../shared/hooks/useScrollGradient";
import "./homepage.styles.scss";
import HomepageClient from "./HomepageClient";

export type Section = {
  header: string;
  headerUrl: string;
};

export interface DataItem {
  header: string;
  data: any;
  headerUrl?: string;
}

export interface TransformedData {
  [key: string]: any[];
}

const Homepage = () => {
  const { err_data } = useGetData();
  // const activeCategory = useScrollGradient();
  // let bannerIndex = 0;

  function transformData(data: DataItem[]): TransformedData {
    const transformedData: TransformedData = {};

    data.forEach((item) => {
      if (!item.data || item.data.length === 0) {
        return;
      }
      if (!transformedData[item.header]) {
        transformedData[item.header] = [];
      }
      transformedData[item.header].push(item.data);
    });

    return transformedData;
  }

  const shapedData = transformData(err_data || []);

  const originalData = err_data || [];

  return (
     <HomepageClient 
      shapedData={shapedData} 
      originalData={originalData} 
    />
  );
};

export default Homepage;
