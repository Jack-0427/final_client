import { gql } from "@apollo/client";

export const USER_SIGNIN = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            username
            email
            token
        }
    }
`;

export const USER_SIGNUP = gql`
    mutation signUp($email: String!, $password: String!, $username: String!) {
        signUp(email: $email, password: $password, username: $username) {
            username
            email
        }
    }
`;

export const CREATE_ASSET = gql`
    mutation createAsset(
        $name: String!
        $available: Boolean!
        $balance: Int!
        $date: String!
        $description: String
    ) {
        createAsset(
            name: $name
            available: $available
            balance: $balance
            date: $date
            description: $description
        ) {
            id
            name
            create_time
            balance
            date
            available
            description
        }
    }
`;

export const CREATE_PAYMENT = gql`
    mutation createPayment(
        $name: String!
        $type: String!
        $webs: [String!]!
        $asset: String!
        $description: String
        $available: Boolean!
        $date: String!
    ) {
        createPayment(
            name: $name
            type: $type
            webs: $webs
            asset: $asset
            description: $description
            available: $available
            date: $date
        ) {
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

export const CREATE_RECORD = gql`
    mutation createExpense(
        $name: String!
        $date: String!
        $description: String!
        $tagname: String!
        $amount: Int!
        $assetname: String!
        $paymentname: String!
    ) {
        createExpense(
            name: $name
            date: $date
            description: $description
            tagname: $tagname
            amount: $amount
            assetname: $assetname
            paymentname: $paymentname
        ) {
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

export const CREATE_TAG = gql`
    mutation createTag($name: String!, $times: Int!) {
        createTag(name: $name, times: $times) {
            id
            times
            name
        }
    }
`;

export const DELETE_RECORD = gql`
    mutation deleteExpense($id: ID!) {
        deleteExpense(id: $id)
    }
`;

export const UPDATE_ASSET = gql`
    mutation updateAsset(
        $id: ID!
        $available: Boolean!
        $date: String!
        $description: String!
        $create_time: Float!
        $balance: Int!
        $name: String!
        $typename: String!
    ) {
        updateAsset(
            id: $id
            available: $available
            date: $date 
            description: $description
            create_time: $create_time
            balance: $balance
            name: $name
            typename: $typename
        ){
            id
            name
            create_time
            balance
            date
            available
            description
        }
    }
`

export const UPDATE_PAYMENT = gql`
    mutation updatePayment(
        $available: Boolean!
        $date: String!
        $description: String!
        $id: ID!
        $type: String!
        $asset: String!
        $create_time: Float!
        $name: String!
        $webs: [String!]!
        $typename: String!
    ) {
        updatePayment(
            available: $available
            date: $date
            description: $description
            id: $id
            type: $type
            asset: $asset
            create_time: $create_time
            name: $name
            webs: $webs
            typename: $typename
        ){
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

export const UPDATE_RECORD = gql`
    mutation updateExpense(
        $amount: Int!
        $asset: String!
        $create_time: Float!
        $date: String!
        $description: String!
        $id: ID!
        $name: String!
        $payment: String!
        $tag: String!
        $typename: String!
    ){
        updateExpense(
            amount: $amount
            asset: $asset
            create_time: $create_time
            date: $date
            description: $description
            id: $id
            name: $name
            payment: $payment
            tag: $tag
            typename: $typename
        ){
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

