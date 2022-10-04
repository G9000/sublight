import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation CreateGroup($object: itemGroup_insert_input!) {
    insert_itemGroup(objects: [$object]) {
      returning {
        id
        name
        image
        description
        createdAt
        ownerId
      }
    }
  }
`;

export const GET_ALL_GROUP = gql`
  query GetAAllGroup($userId: uuid!) {
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

export const GET_GROUP = gql`
  subscription GetGroup($id: uuid!) {
    itemGroup(where: { id: { _eq: $id } }) {
      id
      name
      image
      description
      createdAt
      ownerId
    }
  }
`;
