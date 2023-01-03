import { createContext, useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_TAGS } from "../graphql/query";
import { CREATE_TAG } from "../graphql/mutations";
import { UPDATE_TAG_SUBSCRIPTION } from "../graphql/subscription";
import { useUser } from "./useUser";

const TagContext = createContext({
    data: {},
    update: () => {},
});

const TagProvider = (props) => {
    const { token } = useUser();

    const { data, loading, subscribeToMore } = useQuery(GET_ALL_TAGS, {
        context: { headers: { token: token } },
    });

    const [update] = useMutation(CREATE_TAG);

    useEffect(() => {
        try {
            subscribeToMore({
                document: UPDATE_TAG_SUBSCRIPTION,
                variables: { token },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const tags = subscriptionData.data.tagUpdated;
                    if(tags.length === 1){
                        return { allTags: 
                            prev.allTags.map(ele => ele.name === tags[0].name ? tags[0] : ele)
                        };
                    }  
                    if(tags[0].name === tags[1].name) return prev;
                    let change = prev.allTags.map(ele => ele.name === tags[0].name ? tags[0] : ele);
                    return { allTags: 
                        change.map(ele => ele.name === tags[1].name ? tags[1] : ele),
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    return (
        <TagContext.Provider
            value={{
                data,
                update,
            }}
            {...props}
        />
    );
};

const useTag = () => useContext(TagContext);

export { TagProvider, useTag };
