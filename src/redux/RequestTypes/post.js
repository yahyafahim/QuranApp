import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Common} from '../../config';
import {loaderStart, loaderStop} from '../actions';
import {store} from '../index';

let state = store.getState()?.reducer;
let user_authentication = state?.token;

axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;
// axios.interceptors.request.use(request => {
//       console.log('Axios Starting Request', JSON.stringify(request))
//       return request
//     })
function storeUpdate() {
  state = store.getState()?.reducer;
  user_authentication = state?.token;
  console.log(user_authentication);

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${user_authentication}`;
}

export default async function postApi(
  endpoint,
  params = null,
  sucessToast = true,
  startLoader = true,
  stopLoader = true,
  formdata = true
) {
  storeUpdate();
  if (startLoader) {
    loaderStart();
  }
  try {
    const response = await axios.post(endpoint, params, {
      headers: {'Content-Type':formdata ? 'multipart/form-data' : 'application/json'},
    });
    console.log('ssddsdsd', response);
    if (stopLoader) {
      loaderStop();
    }
    {
      sucessToast
        ? Toast.show({
            text1: response.data.message,
            type: 'success',
            visibilityTime: 5000,
          })
        : null;
    }
    console.log('ooo', response);
    return response.data;
  } catch (e) {
    loaderStop();
    console.log('Error', e.response);
    if (
      e?.message.includes('timeout of ') &&
      e?.message.includes('ms exceeded')
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
        text1: e?.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
    return null;
  }
}
