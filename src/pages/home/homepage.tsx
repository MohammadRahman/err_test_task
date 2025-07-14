/* eslint-disable @typescript-eslint/no-explicit-any */
import Category from "../../shared/components/category/Category";
import Banner from "../../shared/components/hero-banner/Banner";
import { useGetData } from "../../shared/hooks/useGetData";
import "./homepage.styles.scss";

type Section = {
  header: string;
  headerUrl: string;
}

interface DataItem {
  header: string;
  data: any;
  headerUrl?: string;
}

interface TransformedData {
  [key: string]: any[];
}

const Homepage = () => {
  const { err_data } = useGetData();
  let bannerIndex = 0;

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

const originalData = err_data|| [];
  return (
     <div>
      <div className="homepage-container">
        {originalData.map((section: Section, index: number) => {
          if (section.header === "") {
            const currentBannerIndex = bannerIndex++;
            // Render Banner for empty header sections
            return (
              <div key={`banner-${index}`}>
                <Banner content={shapedData[""]} index={currentBannerIndex} />
              </div>
            );
          } else if (shapedData[section.header]) {
            // Render regular category
            return (
              <Category 
                key={section.header} 
                item={shapedData} 
                header={section.header} 
                headerUrl={section.headerUrl}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Homepage;