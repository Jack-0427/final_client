import { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_RECORDS } from "../graphql/query";
import { CREATE_RECORD, DELETE_RECORD, UPDATE_RECORD } from "../graphql/mutations";
import {
    RECORD_SUBSCRIPTION,
    DELETE_RECORD_SUBSCRIPTION,
    UPDATE_RECORD_SUBSCRIPTION
} from "../graphql/subscription";
import { useUser } from "./useUser";

const RecordContext = createContext({
    data: {},
    create: () => {},
    update: () => {},
    Delete: () => {},
});

const RecordProvider = (props) => {
    const { token } = useUser();

    const { data, loading, subscribeToMore } = useQuery(GET_ALL_RECORDS, {
        context: { headers: { token: token } },
    });

    const [create] = useMutation(CREATE_RECORD);
    const [Delete] = useMutation(DELETE_RECORD);
    const [update] = useMutation(UPDATE_RECORD);

    useEffect(() => {
        try {
            subscribeToMore({
                document: RECORD_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const record = subscriptionData.data.record;
                    return { allRecords: [...prev.allRecords, record] };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    useEffect(() => {
        try {
            subscribeToMore({
                document: DELETE_RECORD_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const DeletedId = subscriptionData.data.expenseDeleted;
                    return {
                        allRecords: prev.allRecords.filter(
                            (ele) => ele.id !== DeletedId
                        ),
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    useEffect(() => {
        try {
            subscribeToMore({
                document: UPDATE_RECORD_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const record = subscriptionData.data.expenseUpdated;
                    return {
                        allRecords: prev.allRecords.map(ele => 
                            ele.id === record.id ? record : ele)
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    return (
        <RecordContext.Provider
            value={{
                data,
                create,
                update,
                Delete,
            }}
            {...props}
        />
    );
};

const useRecord = () => useContext(RecordContext);

export { RecordProvider, useRecord };
