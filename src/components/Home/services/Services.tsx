import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import ServiceCard from "./ServiceCard";
import { useQuery } from "@apollo/client";
import { homePage } from "../../../hooks/query/homePage";
import Loader from "../../../util/loader";
import { BASE_URL_FOR_RESTAPI } from "../../../envirement";

const Services: React.FC = () => {
  const { loading, data } = useQuery(homePage);
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="services_sec">
      <Container>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3 mx-auto w-100">
          {data?.HomePage?.serviceDescription && (
            <Col>
              <ServiceCard title={""} description={""} />
            </Col>)}
          {data?.HomePage?.services?.map((item: any, index: any) => (
            <Col key={index} data-aos="fade-up">
              <Card>
                <Card.Body>
                  <Link to={`/services/${item?.id}`}>
                    <img
                      src={`${BASE_URL_FOR_RESTAPI}/upload/${item?.serviceImageName}`}
                      alt={item.serviceImageName}
                    />
                    <div className="caption">
                      <span>{item.serviceName}</span>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
