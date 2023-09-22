import axios from 'axios';
import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import CustomBackground from '../components/CustomBackground';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {Colors, Fonts, NavService} from '../config';
import {loaderStop} from '../redux/actions';
import {login} from '../redux/APIs';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

export class Signin extends Component {
  state = {
    email: '',
    password: '',
    iconShow: false,
    isLoading: false,
  };

  signin = async () => {
    const {email, password} = this.state;

    if (!email?.length || !password.length) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all the fields',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      this.setState({isLoading: true});
      const user = await Auth().signInWithEmailAndPassword(email, password);
      console.log(user.user.uid);
      if (user.user.uid) {
        Firestore()
          .collection('users')
          .doc(user.user.uid)
          .get()
          .then(res => {
            console.log(res.data());
            this.props.saveUser(res.data());
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Signin successful',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });

            this.setState({isLoading: false});
            NavService.reset(0, [{name: 'AppStack'}]);
          });
      }
    }
  };
  // componentDidMount() {
  //   loaderStop();
  // }

  render() {
    const {width} = Dimensions.get('screen');
    const {email, password, iconShow} = this.state;
    const {
      navigation: {navigate},
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Image
            resizeMode="contain"
            style={{width: 300, height: 300, tintColor: Colors.color5}}
            source={require('../assets/Icons/quran.png')}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: 'white',
            // marginHorizontal: 10,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              marginTop: 30,
              marginHorizontal: 30,
              marginBottom: 5,
              fontWeight: '300',
              color: Colors.black,
              fontSize: 28,
              alignSelf: 'flex-start',
              // fontFamily: Fonts.boldItalic,
            }}>
            Login
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              color: 'grey',
              fontWeight: '600',
            }}>
            Welcome back! Log into your account
          </Text>
          <View style={{}} />
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              marginTop: 20,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Email Address
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'blue',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: Colors.color5 + 30,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <Image
                style={{width: 30, height: 30, tintColor: Colors.color5}}
                source={require('../assets/Icons/mail.png')}
              />
            </View>

            <CustomTextInput
              placeholder="Email address"
              value={email}
              onChangeText={text => this.setState({email: text})}
            />
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginHorizontal: 30,
              marginTop: 20,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'blue',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: Colors.color5 + 30,
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <Image
                style={{width: 20, height: 20, tintColor: Colors.color5}}
                source={require('../assets/Icons/lock.png')}
              />
            </View>
            <CustomTextInput
              placeholder="Password"
              value={password}
              onChangeText={text => this.setState({password: text})}
              isPassword={true}
            />
          </View>
          {/* <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 30,
              marginTop: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 25,
                height: 25,
                borderColor: Colors.color5,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                // LayoutAnimation.easeInEaseOut();
                this.setState({iconShow: !iconShow});
              }}>
              {iconShow ? (
                <Image
                  style={{width: 20, height: 20, tintColor: 'red'}}
                  source={require('../assets/Icons/tick.png')}
                />
              ) : null}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                marginLeft: 10,
              }}>
              <Text
                style={{fontSize: 15, color: Colors.color5, fontWeight: '600'}}>
                Remember me
              </Text>
              <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.color5,
                    fontWeight: '700',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {this.state.isLoading ? (
            <ActivityIndicator
              style={{marginTop: 20}}
              size="large"
              color={Colors.color5}
            />
          ) : (
            <CustomButton
              title="Login"
              //   disabled={!email?.length || !password.length}
              // onPress={async () => await login(email, password)}
              buttonStyle={{
                width: width - 60,
              }}
              onPress={this.signin}
            />
          )}
          <Text
            style={{
              margin: 30,
              fontWeight: '300',
              color: Colors.black,
              fontSize: 16,
              alignSelf: 'center',
              // fontFamily: Fonts.boldItalic,
            }}
            onPress={() => navigate('Signup')}>
            Not a member?
            <Text
              style={{
                margin: 30,
                fontWeight: '600',
                color: Colors.color5,
                fontSize: 16,
                alignSelf: 'center',
                // fontFamily: Fonts.boldItalic,
              }}>
              {' '}
              Sign up!
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
    saveUser: user => {
      dispatch({type: 'SAVE_USER', payload: user});
    },
  };
}

export default connect(null, mapDispatchToProps)(Signin);
