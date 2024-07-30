import { gql } from "@apollo/client";

export const basicPackages = gql`
  query BasicPackage($basicPackageId: String) {
    basicPackage(id: $basicPackageId) {
      id
      itemName
      basicQuantity
      deluxeQuantity
      superDeluxeQuantity
      isDeleted
    }
  }
`;

export const superDeluxeQuery = gql`
query SuperDeluxePackage($superDeluxePackageId: String) {
  superDeluxePackage(id: $superDeluxePackageId) {
    id
    itemName
    basicQuantity
    deluxeQuantity
    superDeluxeQuantity
    isDeleted
  }
}`

export const deluxeQuery = gql`
query DeluxePackage($deluxePackageId: String) {
  deluxePackage(id: $deluxePackageId) {
    id
    itemName
    basicQuantity
    deluxeQuantity
    superDeluxeQuantity
    isDeleted
  }
}`

export const packagePriceQuery = gql`
query PackageData($serviceId: String) {
  packageData(serviceId: $serviceId) {
    id
    service
    superDeluxePackagePrice
    deluxePackagePrice
    basicPackagePrice
  }
}`