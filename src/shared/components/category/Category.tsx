/* eslint-disable @typescript-eslint/no-explicit-any */
import Banner from "../hero-banner/Banner";
import Card from "../card/Card";
import "./category.styles.scss";
import { FaChevronRight } from "react-icons/fa6";

interface CategoryProps {
  item: any;
  header: string;
  headerUrl?: string;
}

const Category = ({ item, header, headerUrl }: CategoryProps) => {
  return (
    <div>
      {header === "" ? (
        <Banner content={item[""]} index={null} />
      ) : (
        <div className="category">
          <div className="category__header">
            <h2 className="category-header">{header}</h2>
            {headerUrl && (
              <div className="category__viewAll">
                <FaChevronRight className="icon" />
                <p className="text">Vaata kõiki</p>
              </div>
            )}
          </div>
          <div className="category__cards">
            <Card items={item[header]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
