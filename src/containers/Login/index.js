import {TouchableOpacity, View, Text} from 'react-native';
import React, {Component} from 'react';
import CustomBackground from '../../components/CustomBackground';
import {Colors, Fonts, NavService} from '../../config';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
// import {login} from '../../redux/APIs';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  render() {
    const {email, password} = this.state;
    return (
      <CustomBackground back={false}>
        <Text
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            color: Colors.black,
            fontSize: 28,
            fontFamily: Fonts.boldItalic,
          }}>
          str_WelcomeLogin
        </Text>
        <View style={{height: 75}} />
        <CustomTextInput
          placeholder="Username/ email address"
          value={email}
          onChangeText={text => this.setState({email: text})}
        />
        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={text => this.setState({password: text})}
          isPassword={true}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate('Signup')}>
            <Text
              style={{
                color: Colors.majorelleBlue,
                fontSize: 16,
                fontFamily: Fonts.medium,
              }}>
              str_Register
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.black,
              fontSize: 16,
              fontWeight: '500',
              marginHorizontal: 10,
              fontFamily: Fonts.medium,
            }}>
            /
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate('ForgotPassword')}>
            <Text
              style={{
                color: Colors.majorelleBlue,
                fontSize: 16,
                fontWeight: '500',
                fontFamily: Fonts.medium,
              }}>
              str_ForgotPassword
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title="str_Login"
          disabled={!email?.length || !password.length}
          // onPress={async () => await login(email, password)}
        />
        <Text
          style={{
            color: Colors.dimGray,
            fontSize: 14,
            marginHorizontal: 20,
            marginTop: 25,
          }}>
          <TouchableOpacity disabled>
            <Text
              style={{
                color: Colors.dimGray,
                fontSize: 14,
                fontFamily: Fonts.medium,
              }}>
              str_Regulations1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate('Terms')}>
            <Text
              style={{
                color: Colors.majorelleBlue,
                fontSize: 14,
                fontWeight: '500',
                fontFamily: Fonts.medium,
              }}>
              str_Regulations2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled>
            <Text
              style={{
                color: Colors.dimGray,
                fontSize: 14,
                fontFamily: Fonts.medium,
              }}>
              str_Regulations3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavService.navigate('PrivacyPolicy')}>
            <Text
              style={{
                color: Colors.majorelleBlue,
                fontSize: 14,
                fontWeight: '500',
                fontFamily: Fonts.medium,
              }}>
              str_Regulations4
            </Text>
          </TouchableOpacity>
        </Text>
      </CustomBackground>
    );
  }
}

export default Login;
