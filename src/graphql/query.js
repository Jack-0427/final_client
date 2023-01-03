import { gql } from "@apollo/client";

export const GET_All_ASSETS = gql`
    query {
        allAssets {
            id
            name
            date
            balance
            create_time
            available
            description
        }
    }
`;

export const GET_ALL_PAYMENTS = gql`
    query {
        allPayments {
            id
            name
            type
            date
            asset
            webs
            create_time
            available
            description
        }
    }
`;

export const GET_ALL_RECORDS = gql`
    query {
        allRecords {
            id
            name
            date
            amount
            tag
            payment
            asset
            create_time
            description
        }
    }
`;

export const GET_ALL_TAGS = gql`
    query {
        allTags {
            id
            name
            times
        }
    }
`;
