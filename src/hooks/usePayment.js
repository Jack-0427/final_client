import { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PAYMENTS } from "../graphql/query";
import { CREATE_PAYMENT, UPDATE_PAYMENT } from "../graphql/mutations";
import { PAYMENT_SUBSCRIPTION, UPDATE_PAYMENT_SUBSCRIPTION } from "../graphql/subscription";
import { useUser } from "./useUser";
import dayjs from "dayjs";

const PaymentContext = createContext({
    data: {},
    create: () => {},
    update: () => {},
});

const PaymentProvider = (props) => {
    const { token } = useUser();

    const { data, loading, subscribeToMore } = useQuery(GET_ALL_PAYMENTS, {
        context: { headers: { token: token } },
    });

    const [create] = useMutation(CREATE_PAYMENT);
    const [update] = useMutation(UPDATE_PAYMENT);

    useEffect(() => {
        try {
            subscribeToMore({
                document: PAYMENT_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const payment = subscriptionData.data.payment;
                    return { allPayments: [...prev.allPayments, payment] };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    useEffect(() => {
        try {
            subscribeToMore({
                document: UPDATE_PAYMENT_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const payment = subscriptionData.data.paymentUpdated;
                    // payment.date = dayjs.unix(payment.date/1000).format("YYYY-MM-DD");
                    console.log(payment, "updated payment");
                    return { allPayments: 
                        prev.allPayments.map(ele => ele.id === payment.id ? payment : ele)
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    return (
        <PaymentContext.Provider
            value={{
                data,
                create,
                update,
            }}
            {...props}
        />
    );
};

const usePayment = () => useContext(PaymentContext);

export { PaymentProvider, usePayment };
