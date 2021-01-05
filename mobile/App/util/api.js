import { AsyncStorage } from 'react-native';
import { navigate } from './NavigationService';

const BASE_URL = "http://172.17.58.111:3000";
const AUTH_TOKEN = 'ReviewApp::AUTH_TOKEN';

export const saveAuthToken = token => {
  return !token ? AsyncStorage.removeItem(AUTH_TOKEN) : AsyncStorage.setItem(AUTH_TOKEN, token);
}

export const hasAuthToken = () => {
  return AsyncStorage.getItem(AUTH_TOKEN).then(token => {
    return token ? true : false;
  })
}

export const reviewApi = (path, options = {}) => {
  return AsyncStorage.getItem(AUTH_TOKEN)
    .then(token => {
      const completeOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      }

      if (token) {
        completeOptions.headers.authorization = `Bearer ${token}`;
      }

      return fetch(`${BASE_URL}/api${path}`, completeOptions).then(async res => {
        const responseJson = await res.json();

        if (res.ok) {
          return responseJson;
        }

        if (res.status === 401) {
          navigate('Auth');
          saveAuthToken();
        }

        throw new Error(responseJson.error);
      });
    })
};

