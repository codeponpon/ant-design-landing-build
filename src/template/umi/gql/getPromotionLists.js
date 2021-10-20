import gql from 'graphql-tag'
import moment from 'moment'

const currentDate = moment().utc().format('YYYY-MM-DDTHH:mm:ss')

export const PromotionLists = gql`
  query {
    promotions(
      where: {
        promotionStatus: { in: PUBLIC }
        OR: [
          { promotionEndDate: { equals: null } }
          { promotionEndDate: { gte: "${currentDate}.000Z" } }
        ]
      }
      orderBy: { priority: asc }
    ) {
      id
      title
      description
      bannerUrl
      promotionType
      timeStart
      timeEnd
      promotionStartDate
      promotionEndDate
    }
  }
`

// query {
//   promotions(orderBy: { priority: desc }) {
//     id
//     title
//     priority
//     description
//     bannerUrl
//     promotionCategory
//     promotionCreditType
//     promotionCreditAmount
//     promotionStatus
//     promotionType
//     turnover
//     timeStart
//     timeEnd
//     promotionStartDate
//     promotionEndDate
//     claimAmount
//     claimType
//     depositType
//     depositAmount
//     depositMaxCreditAmount
//   }
// }
