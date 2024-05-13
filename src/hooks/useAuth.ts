import config from "@/config/config";
import { convertTokenResponseToStateTokenResponse } from "@/helper/helper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectTokenResponse, selectUserData, setTokenResponse, setUserData } from "@/redux/authSlice";
import {
  AccessTokenRequestConfig,
  AuthRequestConfig,
  RefreshTokenRequestConfig,
  exchangeCodeAsync,
  fetchUserInfoAsync,
  makeRedirectUri,
  refreshAsync,
  useAuthRequest,
  useAutoDiscovery
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

const clientId = "alesp-demo";
const scopes = ["openid", "profile", "alesp", "offline_access", "email"];

const authRequestConfig: AuthRequestConfig = {
  clientId,
  redirectUri: makeRedirectUri({
    scheme: "alesp-demo",
    path: "home",
  }),
  scopes,
  usePKCE: false,
};

const refreshTokenConfig = (refreshToken) =>
  ({
    clientId,
    scopes,
    refreshToken,
  } as RefreshTokenRequestConfig);

function tokenExchangeConfig(code: string): AccessTokenRequestConfig {
  return {
    clientId: "alesp-demo",
    redirectUri: makeRedirectUri({
      scheme: "alesp-demo",
      path: "home",
    }),
    code,
  };
}

WebBrowser.maybeCompleteAuthSession();

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const tokenResponse = useAppSelector(selectTokenResponse);
  const userData = useAppSelector(selectUserData);

  const discovery = useAutoDiscovery(`${config.keycloak_url}/auth/realms/alesp`);

  // if (!discovery) {return}

  // Create and load an auth request
  const [request, response, promptAsync] = useAuthRequest(authRequestConfig, discovery);

  async function refreshToken() {
    if (!tokenResponse) {
      await signOut();
      return 
    }
    const expireDate = DateTime.fromMillis(tokenResponse.issuedAt * 1000).plus({
      seconds: tokenResponse.expiresIn,
    });

    const expired = expireDate < DateTime.now();
    console.debug("TOKEN - checking");

    if (expired) {
      console.debug("TOKEN - expired, refreshing");
      try {
        console.debug({ discovery });
        const tokenResponseRefresh = await refreshAsync(refreshTokenConfig(tokenResponse.refreshToken), discovery);
        dispatch(setTokenResponse(convertTokenResponseToStateTokenResponse(tokenResponseRefresh)));
        console.debug("TOKEN - Token refreshed");
        return tokenResponseRefresh;
      } catch (error) {
        console.error(error);
        console.debug("TOKEN - Error refreshing token, user must login again, calling signOut");
        await signOut();
      }
    }
    console.debug("TOKEN - Token still valid, expires at " + expireDate.toISO());
    return tokenResponse;
  }

  async function refreshUserData() {
    await refreshToken();
    let newUserData = userData;
    if (!userData || userData.error === "invalid_token") {
      newUserData = await fetchUserInfoAsync({ accessToken: tokenResponse.accessToken }, discovery);
      dispatch(setUserData(newUserData));
    }
    return newUserData;
  }

  async function signOut() {
    dispatch(setUserData(null));
    dispatch(setTokenResponse(null));
    setLoggedIn(false);
  }

  async function signIn() {
    return promptAsync().then(async (result) => {
      if (result.type === "success") {
        setLoggedIn(true);
        const tokenResponse = await exchangeCodeAsync(tokenExchangeConfig(result.params.code), discovery);
        dispatch(setTokenResponse(convertTokenResponseToStateTokenResponse(tokenResponse)));
        return true;
      }
    });
  }

  const disableLogin = useMemo(() => {
    return !request;
  }, [request]);

  useEffect(() => {
    if (tokenResponse && userData) {
      setLoggedIn(true);
    }
  }, [tokenResponse, userData]);

  useEffect(() => {
    if (tokenResponse && discovery) refreshUserData();
  }, [tokenResponse, discovery]);

  return {
    loggedIn,
    disableLogin,
    userData,
    signIn,
    signOut,
    refreshUserData,
    refreshToken,
  };
}
