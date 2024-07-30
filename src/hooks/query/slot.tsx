import { gql } from "@apollo/client";

export  const findSlotQueryByStartDate=gql`
query FindSlotByDate($startDate: String!) {
  findSlotByDate(startDate: $startDate) {
    id
    startDate
    startTime
    endTime
  }
}`