import { gql } from "@apollo/client";

export const ASSET_SUBSCRIPTION = gql`
    subscription asset($token: String!) {
        asset(token: $token) {
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

export const PAYMENT_SUBSCRIPTION = gql`
    subscription payment($token: String!) {
        payment(token: $token) {
            id
            name
            type
            date
            asset
            available
            webs
            description
            create_time
        }
    }
`;

export const RECORD_SUBSCRIPTION = gql`
    subscription record($token: String!) {
        record(token: $token) {
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

export const UPDATE_TAG_SUBSCRIPTION = gql`
    subscription tagUpdated($token: String!) {
        tagUpdated(token: $token){
            id
            name
            times
        }
    }
`

export const DELETE_RECORD_SUBSCRIPTION = gql`
    subscription expenseDeleted($token: String!) {
        expenseDeleted(token: $token)
    }
`;

export const UPDATE_ASSET_SUBSCRIPTION = gql`
    subscription assetUpdated($token: String!) {
        assetUpdated(token: $token){
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

export const UPDATE_PAYMENT_SUBSCRIPTION = gql`
    subscription paymentUpdated($token: String!) {
        paymentUpdated(token: $token){
            id
            name
            type
            date
            asset
            available
            webs
            description
            create_time
        }
    }
`

export const UPDATE_RECORD_SUBSCRIPTION = gql`
    subscription expenseUpdated($token: String!) {
        expenseUpdated(token: $token){
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
`
