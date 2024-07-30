import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServiceCard from "../../common/serviceCard/ServiceCard";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  servicePageDescription,
  servicesPageQuery,
} from "../../hooks/query/servicesPage";
import Loader from "../../util/loader";
import { BASE_URL_FOR_RESTAPI } from "../../envirement";

const ServiceSection: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState(6);

  const loadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 6);
  };

  const { loading, data } = useQuery(servicesPageQuery);
  const { loading: dataloader, data: dataManage } = useQuery(
    servicePageDescription
  );

  if (loading || dataloader) {
    return <Loader />;
  }

  return (
    <section className="services_sec inner_services">
      <div className="sec_main_heading text-center">
        <h2>Service We Provide</h2>
        <p>{dataManage?.servicePageDataListing[0]?.serviceDescription}</p>
      </div>
      <Container>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3 mx-auto w-100">
          {data?.serviceListing
            ?.slice(0, visibleCards)
            .map((item: any, index: number) => (
              <Col key={index} data-aos="fade-up">
                <Link to={item.id}>
                  <ServiceCard
                    imgSrc={`${BASE_URL_FOR_RESTAPI}/upload/${item?.serviceImageName}`}
                    title={item?.serviceName}
                  />
                </Link>
              </Col>
            ))}
        </Row>
        {visibleCards < data?.serviceListing.length && (
          <div className="load_more" onClick={loadMore}>
            <p className="py-4">Load more...</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ServiceSection;
