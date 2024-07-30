import { gql } from "@apollo/client";

export const homePage = gql`
query Query {
  HomePage {
    footer {
      id
      footerLogo
      footerDescription
      socialMedia {
        facebook
        twitter
        instagram
        linkedin
      }
    }
    header {
      id
      imageName
    }
    serviceDescription {
      id
      serviceName
      serviceSubheading
      serviceDescription
      serviceButton
    }
    services {
      id
      serviceName
      altName
      serviceImageName
      isDeleted
    }
  }
}
`