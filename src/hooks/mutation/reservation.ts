import { gql } from "@apollo/client";

export const reservationMutations = gql`
mutation CreateReservation($input: reservationInput) {
  createReservation(input: $input) {
    reservationForm
    serviceId
    serviceName
    packages
    packagePrice
    packageType
  }
}
`;
