import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Common} from '../../config';
import {loaderStart, loaderStop} from '../actions';
import {store} from '../index';

let state = store.getState()?.reducer;
let user_authentication = state?.token;

axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;

function storeUpdate() {
  state = store.getState()?.reducer;
  user_authentication = state?.token;

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${user_authentication}`;
}

export default async function putApi(
  endpoint,
  params = null,
  sucessToast = true,
) {
  storeUpdate();
  loaderStart();
  try {
    const response = await axios.put(endpoint, params);
    loaderStop();
    {
      sucessToast
        ? Toast.show({
            text1: response.data.message,
            type: 'success',
            visibilityTime: 5000,
          })
        : null;
    }
    return response.data;
  } catch (e) {
    loaderStop();
    if (
      e.message.includes('timeout of ') &&
      e.message.includes('ms exceeded')
    ) {
      Toast.show({
        text1: "Can't connect to server",
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else if (e.response?.data?.message) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else {
      Toast.show({
        text1: e.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
    return null;
  }
}
