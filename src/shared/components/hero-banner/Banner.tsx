import { FaCirclePlay } from "react-icons/fa6";
import "./banner.styles.scss";

interface BannerProps {
  content: {
    id: number;
    heading: string;
    lead?: string;
    photos?: { photoUrlBase: string }[];
  }[][];
  index: number | null; 
}

const Banner = ({ content, index }: BannerProps) => {

const bannerContent = index !== null ? content[index] || [] : content.flat();
  return (
    <div className="banner">
      {bannerContent.map((item) => {
        const url = item?.photos?.map((i) => i.photoUrlBase);
        console.log(url);
        return (
          <div key={item.id} style={{ height: "100%", position: "relative" }}>
            <div className="banner-backdrop">
              <div className="backdrop-image" style={{ backgroundImage: `url(${url})` }} />
              <div className="backdrop-overlay"></div>
            </div>

            <div
            className="banner-content"
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#203443",
                  color: "#ffffff",
                  width: "95px",
                  height: "45px",
                  borderRadius: "5px",
                  transition: "all 0.2s ease",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "1rem",
                }}
              >
                <FaCirclePlay /> <span> Vaata</span>
              </div>
              <h1 className="banner-title">{item.heading}</h1>
              <p className="banner-lead-text">{ item?.lead?.replace(/<\/?p>/g, '')}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
