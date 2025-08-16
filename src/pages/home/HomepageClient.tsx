// components/HomepageClient.tsx
'use client';

import Category from "../../shared/components/category/Category";
import Banner from "../../shared/components/hero-banner/Banner";
import { useScrollGradient } from "../../shared/hooks/useScrollGradient";
import type { DataItem, TransformedData } from "./homepage";


export default function HomepageClient({
  shapedData,
  originalData
}: {
  shapedData: TransformedData;
  originalData: DataItem[];
}) {
  const activeCategory = useScrollGradient();
  let bannerIndex = 0;

  return (
    <div>
      <div className="homepage-container">
        {originalData.map((section: DataItem, index: number) => {
          if (section.header === "") {
            const currentBannerIndex = bannerIndex++;
            return (
              <div
                key={`banner-${index}`}
                id={`category-${section.header || index}`}
                data-category
                className={`category-wrapper ${
                  activeCategory === `category-${section.header}`
                    ? "active-gradient"
                    : ""
                }`}
              >
                <Banner content={shapedData[""]} index={currentBannerIndex} />
              </div>
            );
          } else if (shapedData[section.header]) {
            return (
              <div
                key={section.header}
                id={`category-${section.header}`}
                data-category
                className={`category-wrapper ${
                  activeCategory === `category-${section.header}`
                    ? "active-gradient"
                    : ""
                }`}
              >
                <div className="gradient-middle" />
                <Category
                  key={section.header}
                  item={shapedData}
                  header={section.header}
                  headerUrl={section.headerUrl ?? ""}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}