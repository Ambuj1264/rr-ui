import { gql } from "@apollo/client";

export const servicesPageQuery=gql`
query ServiceListing {
  serviceListing {
    id
    serviceName
    altName
    serviceImageName
    isDeleted
  }
}
`

export const findServicesQuery = gql`
query FindService($findServiceId: String!) {
  FindService(id: $findServiceId) {
    id
    serviceName
    altName
    serviceImageName
    serviceDescription
    priority
    isDeleted
  }
}`

export const servicePageDescription= gql`
query Query {
  servicePageDataListing {
    id
    serviceBanner
    serviceDescription
    isDeleted
  }
}
`
export const serviceListingOfTopFive= gql`
query ServiceListingOfTopFive {
  serviceListingOfTopFive {
    id
    serviceName
    altName
    serviceImageName
    serviceDescription
    priority
    isDeleted
  }
}
`