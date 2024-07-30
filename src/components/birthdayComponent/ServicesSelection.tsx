import React from "react";
import Bannar from "../../common/bannar/Bannar";
import BirthdayImage from "../../common/birthdayImage/BirthdayImage";
import { Container } from "react-bootstrap";
import EventCalendar from "./EventCalendar";
import TabPackage from "./TabPackage";
import { useQuery } from "@apollo/client";
import { findServicesQuery } from "../../hooks/query/servicesPage";
import Loader from "../../util/loader";
import { useParams } from "react-router-dom";

const ServicesSelection: React.FC = () => {
  const params = useParams();
  const { loading, data } = useQuery(findServicesQuery, {
    variables: {
      findServiceId: params?.id,
    },
  });
  if (loading) {
    return <Loader />;
  }
  function capitalizeFirstLetter(string: string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Bannar
        pageTitle={capitalizeFirstLetter(data?.FindService?.serviceName)}
        breadcrumbItems={
          data?.FindService?.serviceName
            ? [
                capitalizeFirstLetter(data?.FindService?.serviceName),
                capitalizeFirstLetter(data?.FindService?.id),
              ]
            : []
        }
      />
      <div className="birthday_party">
        <Container>
          <BirthdayImage
            title={data?.FindService?.serviceName}
            description={data?.FindService?.serviceDescription}
            image={data?.FindService?.serviceImageName}
          />
          <TabPackage />
          <EventCalendar />
        </Container>
      </div>
    </>
  );
};

export default ServicesSelection;
