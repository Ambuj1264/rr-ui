import { Container, Row, Col } from "react-bootstrap";
import ScrollTopButton from "../../common/scrollTopButton/ScrollTopButton";
import { homePage } from "../../hooks/query/homePage";
import { useQuery } from "@apollo/client";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Loader from "../../util/loader";

const Footer: React.FC = () => {
  const { loading, data } = useQuery(homePage);
  if (loading) {
    return <Loader />;
  }
  let socialMediaLink = data?.HomePage?.footer?.socialMedia[0];
  return (
    <footer className="footer_sec">
      <Container>
        <Row>
          <Col md={6}>
            <div className="footer_logo">
              <h1
                style={{
                  color: "#ef5656",
                  fontSize: "40px",
                  fontWeight: "bold",
                  wordBreak: "break-all",
                }}
              >
                {data?.HomePage?.footer?.footerLogo}
              </h1>
              <p className="p-footer">{data?.HomePage?.footer?.footerDescription}</p>
              <div className="icons">
                <Link to={socialMediaLink?.facebook}>
                  <FacebookOutlinedIcon
                    fontSize="large"
                    sx={{ color: "white" }}
                  />
                </Link>
                <Link to={socialMediaLink?.twitter}>
                  <TwitterIcon fontSize="large" sx={{ color: "white" }} />
                </Link>

                <Link to={socialMediaLink?.linkedin}>
                  <LinkedInIcon fontSize="large" sx={{ color: "white" }} />
                </Link>
                <Link to={socialMediaLink?.instagram}>
                  <InstagramIcon fontSize="large" sx={{ color: "white" }} />
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="footer_social">
              <div className="link">
                <h6>Services</h6>
                <ul className="px-0">
                  {data?.HomePage?.services.slice(0, 3).map((item: any, index: any) => (
                    <li key={index}>
                      <Link to={`/services/${item?.id}`}>{item?.serviceName}</Link>
                    </li>
                  ))}
                  <Link to="/services" style={{ textDecoration: "none", color: "white" }}>View more </Link>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <ScrollTopButton />
      </Container>
    </footer>
  );
};

export default Footer;
