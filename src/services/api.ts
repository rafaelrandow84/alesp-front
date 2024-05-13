// Need to use the React-specific entry point to import createApi
import config from "@/config/config";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: config.api_url,
    async prepareHeaders(headers, { getState }) {
        const state = getState() as RootState;
        const tokenResponse = state.auth.tokenResponse;

        if (tokenResponse) {
            headers.set("authorization", `Bearer ${tokenResponse.accessToken}`);
        }
        return headers;
    },
});

// Define a service using a base URL and expected endpoints
export const mobileApi = createApi({
    reducerPath: "mobileApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getDeputados: builder.query<any, void>({
            query: () => `/dados-abertos/deputados`,
            transformResponse(baseQueryReturnValue: { deputado }, meta, arg) {
                return baseQueryReturnValue.deputado;
            },
        }),
        getCalendario: builder.query<any, void>({
            query: () => `/rh/calendario`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDeputadosQuery, useGetCalendarioQuery } = mobileApi;
