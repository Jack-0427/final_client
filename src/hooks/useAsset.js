import { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_All_ASSETS } from "../graphql/query";
import { CREATE_ASSET, UPDATE_ASSET } from "../graphql/mutations";
import { ASSET_SUBSCRIPTION, UPDATE_ASSET_SUBSCRIPTION } from "../graphql/subscription";
import { useUser } from "./useUser";
import dayjs from "dayjs";

const AssetContext = createContext({
    data: {},
    create: () => {},
    update: () => {},
});

const AssetProvider = (props) => {
    const { token } = useUser();

    const { data, loading, subscribeToMore } = useQuery(GET_All_ASSETS, {
        context: { headers: { token: token } },
    });

    const [create] = useMutation(CREATE_ASSET);
    const [update] = useMutation(UPDATE_ASSET);

    useEffect(() => {
        try {
            subscribeToMore({
                document: ASSET_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const asset = subscriptionData.data.asset
                    return { allAssets: [...prev.allAssets, asset] };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    useEffect(() => {
        try {
            subscribeToMore({
                document: UPDATE_ASSET_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    let asset = subscriptionData.data.assetUpdated;
                    // asset.date = dayjs.unix(asset.date/1000).format("YYYY-MM-DD");
                    return { allAssets: 
                        prev.allAssets.map(ele => ele.id === asset.id ? asset : ele) 
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    return (
        <AssetContext.Provider
            value={{
                data,
                create,
                update,
            }}
            {...props}
        />
    );
};

const useAsset = () => useContext(AssetContext);

export { AssetProvider, useAsset };
