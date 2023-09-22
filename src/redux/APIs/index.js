import {NavService} from '../../config';
import Toast from 'react-native-toast-message';
import postApi from '../RequestTypes/post';
import getApi from '../RequestTypes/get';
import {
  loaderStart,
  loaderStop,
  resetUser,
  saveToken,
  saveUser,
} from '../actions';
import axios from 'axios';

export async function login(email, password) {
  if (!email && !password) {
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  }

  const form = new FormData();
  form.append('email', email);
  form.append('password', password);

  const data = await postApi('auth/login', form, false);

  if (data) {
    saveUser(data.response.data.user);
    saveToken(data.response.data.accessToken);
    console.log('done');
  }
  if (
    data.response.data.user.email_verified_at &&
    data.response.data.user.is_active === '1'
  ) {
    NavService.reset(0, [{name: 'AppStack'}]);
  } else if (!data.response.data.user.email_verified_at) {
    NavService.navigate('otp');
    Toast.show({
      text1: 'Please verify Your Email First',
      type: 'error',
      visibilityTime: 3000,
    });
  } else {
    Toast.show({
      text1: 'Your Request is still pending',
      type: 'error',
      visibilityTime: 3000,
    });
  }
}

export async function register(
  email,
  password,
  confirmPassword,
  phone,
  firstName,
  lastName,
  username,
) {
  if (
    !email ||
    !password ||
    !confirmPassword ||
    !phone ||
    !firstName ||
    !lastName ||
    !username
  ) {
    return Toast.show({
      text1: 'Please enter all infoo',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  const params = new FormData();
  params.append('first_name', firstName);
  params.append('last_name', lastName);
  params.append('username', username);
  params.append('email', email);
  params.append('confirm_password', confirmPassword);
  params.append('password', password);
  params.append('phone', phone);

  const data = await postApi('auth/register', params, false);
  if (data) {
    saveUser(data.response.data.user);
    saveToken(data.response.data.accessToken);
    NavService.navigate('otp', {email});
  }
}

export async function verifyOTP(code) {
  const params = new FormData();
  params.append('code', `${code}`);

  const data = await postApi('auth/verification', params);
  console.log(data);
  if (data?.status == 1) {
    NavService.navigate('Signin');
  }
}

export async function forgetPassword(email, setter) {
  if (!email) {
    return Toast.show({
      text1: 'Please enter your email',
      type: 'error',
      visibilityTime: 3000,
    });
  }

  const params = new FormData();
  params.append('email', `${email}`);

  const data = await postApi('auth/forgot-password', params);
  console.log('first', data);
  if (data?.status == 1) {
    setter();
  }
}

export async function resetPassword(code, email, password, confirmPassword) {
  console.log('reset', code, email, password, confirmPassword);
  if (!code) {
    return Toast.show({
      text1: 'Please enter the code',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  if (code.length < 4) {
    return Toast.show({
      text1: 'Code length should be 4 characters',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  if (!password) {
    return Toast.show({
      text1: 'Please enter your password',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  if (!confirmPassword) {
    return Toast.show({
      text1: 'Please enter your confirm password',
      type: 'error',
      visibilityTime: 3000,
    });
  }

  if (password !== confirmPassword) {
    return Toast.show({
      text1: 'Password do not match',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  const params = new FormData();

  params.append('email', email);
  params.append('code', parseInt(code));
  params.append('password', password);
  params.append('confirm_password', confirmPassword);

  const data = await postApi('auth/reset-password', params);
  if (data?.status == 1) {
    console.log(data);
    NavService.reset(0, [{name: 'AuthStack'}]);
  }
}

export async function logout() {
  loaderStart();
  resetUser();
  setTimeout(() => {
    loaderStop();
    NavService.reset(0, [{name: 'AuthStack'}]);
  }, 1000);
}

export async function getAllNutrients() {
  const response = await getApi('nutrients/show_all', false);
  if (response?.response?.data?.length) return response?.response.data;
  return [];
}

export async function getIngredients() {
  const response = await getApi('ingredients/show_all', false);
  if (response?.response?.data?.length) return response?.response.data;
  return [];
}

export async function getIngredientByID(id) {
  const response = await getApi(`ingredients/show/${id}`, false);
  if (response?.status == 1) {
    console.log(response.response.data, 'shahahhahahaha');
    return response?.response.data;
  }
  return [];
}

export async function deleteIngredientByID(id) {
  const response = await getApi(`ingredients/delete/${id}`, false);
  console.log('response', response);
  if (response?.status == 1) {
    return response?.data;
  }
  return [];
}

export async function createIngredients(name, code, type, plant, stock) {
  if (!name || !code || !type || !plant || !stock) {
    return Toast.show({
      text1: 'Please enter all infoo',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  const params = new FormData();
  params.append('name', name);
  params.append('code', code);
  params.append('type', type);
  params.append('plant', plant);
  params.append('stock', stock);
  console.log('create', params);

  const data = await postApi('ingredients/create', params, false);
  if (data) {
    NavService.navigate('IngredientsList', {name});
  }
}

export async function updateIngredients(name, type, plant, stock, id) {
  console.log('object', name, type, plant, stock, id);
  if (!name || !id || !type || !plant || !stock)
    return Toast.show({
      text1: 'Please enter all infoo',
      type: 'error',
      visibilityTime: 3000,
    });
  // if (!EmailValidator.validate(email))
  //   return Toast.show({
  //     text1: 'Email not valid',
  //     type: 'error',
  //     visibilityTime: 3000,
  //   });
  const params = new FormData();
  params.append('name', name);
  params.append('id', id);
  params.append('type', type);
  params.append('plant', plant);
  params.append('stock', stock);
  console.log('create', params);

  const data = await postApi('ingredients/update', params, false);
  console.log(data);
  if (data) {
    // saveUser(data.response.data.user);
    // saveToken(data.response.data.accessToken);
    NavService.navigate('IngredientsList', {name});
  }
}

export async function createFormula(payload) {
  const data = await postApi(
    'formulation/create_formula',
    payload,
    true,
    true,
    true,
    false,
  );
  if (data) {
    return data?.response?.data;
  }
  return null;
}

export async function createNutrients(
  name,
  code,
  type,
  plant,
  unit,
  ingredientID,
) {
  // alert('kok');
  console.log(
    'object',
    name,
    code,
    type,
    plant,
    unit,
    percentage,
    ingredientID,
  );
  if (
    !name ||
    !code ||
    !type ||
    !plant ||
    !unit ||
    !percentage ||
    !ingredientID
  )
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  // if (!EmailValidator.validate(email))
  //   return Toast.show({
  //     text1: 'Email not valid',
  //     type: 'error',
  //     visibilityTime: 3000,
  //   });
  const params = new FormData();
  params.append('name', name);
  params.append('code', code);
  params.append('type', type);
  params.append('plant', plant);
  params.append('unit', unit);
  params.append('Percentage', percentage);
  params.append('ingredient_id', ingredientID);
  console.log('create', params);
  console.log('data', params);

  const data = await postApi('nutrients/create', params, false);
  console.log(data);
  if (data) {
    // saveUser(data.response.data.user);
    // saveToken(data.response.data.accessToken);
    NavService.navigate('IngredientsList', {name});
  }
}

export async function createPlant(name, code, plant, species) {
  if (!name || !code || !plant || !species) {
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  const params = new FormData();
  params.append('name', name);
  params.append('code', code);
  params.append('plant', plant);
  params.append('species', species);
  console.log('create', params);

  const data = await postApi('plants/create', params, false);
  if (data) {
    NavService.navigate('plants', {name});
  }
}

export async function updateNutrients(name, type, plant, percentage, id, unit) {
  console.log('object', name, type, plant, percentage, id, unit);
  if (!name || !id || !type || !plant || !percentage || !unit)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  // if (!EmailValidator.validate(email))
  //   return Toast.show({
  //     text1: 'Email not valid',
  //     type: 'error',
  //     visibilityTime: 3000,
  //   });
  const params = new FormData();
  params.append('name', name);
  params.append('id', id);
  params.append('type', type);
  params.append('plant', plant);
  params.append('Percentage', parseInt(percentage));
  params.append('unit', unit);
  console.log('create', params);

  const data = await postApi('nutrients/update', params, false);
  console.log(data);
  if (data) {
    // saveUser(data.response.data.user);
    // saveToken(data.response.data.accessToken);
    NavService.navigate('IngredientsList');
  }
}

export async function getNutrients() {
  const response = await getApi('nutrients/show_all', false);
  if (response?.response?.data?.length) return response?.response.data;
  return [];
}
export async function getPlants() {
  const response = await getApi('plants/show_all', false);
  if (response?.response?.data?.length) return response?.response.data;
  return [];
}

export async function deleteNutrientByID(id) {
  const response = await getApi(`nutrients/delete/${id}`, false);
  console.log('response', response);
  if (response?.status == 1) {
    return response?.data;
  }
  return [];
}
export async function deletePlantByID(id) {
  const response = await getApi(`plants/delete/${id}`, false);
  console.log('response', response);
  if (response?.status == 1) {
    return response?.data;
  }
  return [];
}
export async function updatePlants(name, code, plant, species, id) {
  console.log('object', name, code, plant, species);
  if (!name || !code || !species || !plant || !id)
    return Toast.show({
      text1: 'Please enter all infoo',
      type: 'error',
      visibilityTime: 3000,
    });
  // if (!EmailValidator.validate(email))
  //   return Toast.show({
  //     text1: 'Email not valid',
  //     type: 'error',
  //     visibilityTime: 3000,
  //   });
  const params = new FormData();
  params.append('name', name);
  params.append('id', parseInt(id));
  params.append('code', code);
  params.append('plant', plant);
  params.append('species', species);
  console.log('create', params);

  const data = await postApi('plants/update', params, false);
  console.log(data);
  if (data) {
    // saveUser(data.response.data.user);
    // saveToken(data.response.data.accessToken);
    NavService.navigate('plants');
  }
}

export async function formulation(arr) {
  if (!arr)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  const params = {
    nutrations: arr,
  };
  const res = await axios.post('formulation/get_nutration', params);
  console.log(res.data);
  if (res.data) {
    return res.data.response.data;
  } else return null;
}

export async function formulaByID(arr) {
  console.log('objectytyt', arr);
  if (!arr)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  const params = {
    ingredient: arr,
  };
  const res = await axios.post('formulation/get_nutration', params);
  console.log(res.data);
  if (res.data) {
    return res.data.response.data;
  } else return null;
}

export async function insertFormula(payload, loaderStop) {
  try {
    const res = await axios.post('formulation/create', payload);
    if (res.data) {
      Toast.show({
        text1: 'Data Inserted',
        type: 'success',
        visibilityTime: 3000,
      });
      NavService.goBack();
    }
  } catch (e) {
    Toast.show({
      text1: 'Something went wrong!',
      type: 'error',
      visibilityTime: 3000,
    });
  } finally {
    loaderStop();
  }
}
