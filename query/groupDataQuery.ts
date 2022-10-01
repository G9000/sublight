import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query GetGroup($userId: uuid!) {
    itemGroup(where: { ownerId: { _eq: $userId } }) {
      id
      name
      image
      description
      createdAt
      ownerId
    }
  }
`;
