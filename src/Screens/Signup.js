import React, {Component} from 'react';
import {Text, Dimensions, View, Image, ActivityIndicator} from 'react-native';
import CustomBackground from '../components/CustomBackground';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {Colors, Fonts, NavService} from '../config';
import Firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {connect} from 'react-redux';

export class Signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    isLoading: false,
  };

  Signup = async () => {
    const {email, password, confirmPassword, fullname} = this.state;
    if (
      email?.length &&
      password?.length &&
      confirmPassword?.length &&
      fullname?.length
    ) {
      if (password === confirmPassword) {
        this.setState({isLoading: true});

        const user = await Auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        Firestore()
          .collection('users')
          .doc(user.user.uid)
          .set({
            email,
            password,
            fullname,
            id: user.user.uid,
            phone: '',
          })
          .then(res => {
            this.props.saveUser({
              fullname,
              email,
              id: user.user.uid,
              password,
              phone: '',
            });
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Signup successful',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
            NavService.reset(0, [{name: 'AppStack'}]);
            this.setState({isLoading: false});
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Password does not match',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
  render() {
    const {width} = Dimensions.get('screen');
    const {email, password, confirmPassword, phone, fullname} = this.state;
    console.log('dcdc', email, password, confirmPassword, fullname);
    const {
      navigation: {navigate, goBack},
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
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
            backgroundColor: Colors.white,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              marginTop: 30,
              marginBottom: 10,
              fontWeight: '300',
              color: Colors.black,
              fontSize: 22,
              alignSelf: 'flex-start',
              marginLeft: 15,
              // fontFamily: Fonts.boldItalic,
            }}>
            Signup Request
          </Text>
          <View style={{}} />

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
                source={require('../assets/Icons/profile.png')}
              />
            </View>
            <CustomTextInput
              placeholder="Fullname"
              value={fullname}
              onChangeText={text => this.setState({fullname: text})}
            />
          </View>
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
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={text => this.setState({confirmPassword: text})}
              isPassword={true}
            />
          </View>
          {this.state.isLoading ? (
            <ActivityIndicator
              style={{marginTop: 20}}
              size="large"
              color={Colors.color5}
            />
          ) : (
            <CustomButton
              title="Signup"
              //   disabled={!email?.length || !password.length}
              // onPress={async () => await login(email, password)}
              buttonStyle={{
                width: width - 60,
              }}
              onPress={() => this.Signup()}
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
            onPress={() => navigate('Signin')}>
            Already a member?
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
              Sign in!
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

export default connect(null, mapDispatchToProps)(Signup);
