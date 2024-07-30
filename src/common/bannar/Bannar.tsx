import { useQuery } from "@apollo/client";
import React from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { servicePageDescription } from "../../hooks/query/servicesPage";
import { BASE_URL_FOR_RESTAPI } from "../../envirement";
import Loader from "../../util/loader";
interface ServiceBannarProps {
  pageTitle: string;
  breadcrumbItems?: any;
}
const Bannar: React.FC<ServiceBannarProps> = ({
  pageTitle,
  breadcrumbItems,
}) => {
  const { loading, data } = useQuery(servicePageDescription);
  if (loading) {
    return <Loader />;
  }
  const breadcrumbText = breadcrumbItems[0] ? breadcrumbItems[0] + " /" : breadcrumbItems[0];
  const breadcrumbTextStyle = {
    color: '#A6A6A6',
  };
  return (
    <div>
      <section
        style={{
          backgroundImage: `url(${BASE_URL_FOR_RESTAPI}/upload/${data?.servicePageDataListing[0]?.serviceBanner})`,
        }}
        id="inner_breadcrumb"
      >
        <Container className="breadcrumb_heading">
          <h1>{pageTitle}</h1>
          <Breadcrumb
            className="breadcrumb breadcrumb_links"
            data-aos="fade-up"
          >
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={`/services`}>Services</Breadcrumb.Item>
            <Breadcrumb.Item href={`/services/${breadcrumbItems[1]}`}>
            <span style={breadcrumbTextStyle}>{breadcrumbText}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
    </div>
  );
};
export default Bannar;
