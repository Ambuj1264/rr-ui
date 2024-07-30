

import { gql } from "@apollo/client";


export const reservationQueryForFormQuery = gql` 
query ReservationFormSingleDataForUI($serviceId: String!) {
  reservationFormSingleDataForUI(serviceId: $serviceId) {
    id
    serviceName
    serviceId
    fields
  }
}`