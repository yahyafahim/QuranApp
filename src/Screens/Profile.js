import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors, NavService} from '../config';
import CustomButton from '../components/CustomButton';
import {connect} from 'react-redux';
import Firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export class Profile extends Component {
  state = {
    name: this.props.user.fullname ? this.props.user.fullname : '',
    email: this.props.user.email ? this.props.user.email : '',
    phone: this.props.user.phone ? this.props.user.phone : '',
    isLoading: false,
  };
  Logout = () => {
    NavService.reset(0, [{name: 'AuthStack'}]);
    setTimeout(() => {
      this.props.saveUser(null);
      this.props.savedPage(null);
      this.props.StartOver(1);
      this.props.QuranData(null);
      this.props.QuranAudioData(null);
      this.props.QuranAudioData2(null);
      this.props.QuranTranslationData(null);
    }, 1000);
  };
  profileUpdate = () => {
    const {name, email, phone} = this.state;
    const user = this.props.user;
    console.log(user);
    if (name !== this.props.user.fullname || phone !== this.props.user.phone) {
      const data = {
        fullname: name,
        email,
        phone,
      };
      this.setState({isLoading: true});
      Firestore()
        .collection('users')
        .doc(user.id)
        .update({...user, ...data})
        .then(res => {
          console.log('res', res);
          this.props.saveUser({...user, ...data});
          this.setState({isLoading: false});
          Toast.show({
            type: 'success',
            text1: 'Sucess',
            text2: 'Profile Updated',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'warning',
        text2: 'No changes made',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };
  render() {
    console.log(this.props.user);
    const {width, height} = Dimensions.get('screen');
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: height,
            height: height,
            backgroundColor: Colors.color5,
            borderRadius: height,
            alignSelf: 'center',
            marginTop: -height / 1.4,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '40%',
            }}>
            <TouchableOpacity
              onPress={() => {
                NavService.goBack();
              }}>
              <Image
                tintColor={Colors.white}
                style={{width: 25, height: 25}}
                source={require('../assets/Icons/back.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginBottom: 30,
                color: Colors.white,
                fontSize: 22,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                marginLeft: 70,
              }}>
              shahmeer ahmed
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              width: 150,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: Colors.color5,
              borderWidth: 2,
              borderRadius: 150,
              marginBottom: -50,
            }}>
            <Image
              resizeMode="contain"
              tintColor={Colors.color5}
              style={{width: 100, height: 100}}
              source={require('../assets/Icons/profileIcon.png')}
            />
          </View>
        </View>
        <View style={{marginTop: 100}}>
          <View
            style={{flexDirection: 'row', paddingHorizontal: 30, padding: 25}}>
            <Image
              tintColor={Colors.color5}
              style={{width: 30, height: 30}}
              source={require('../assets/Icons/profile.png')}
            />
            <TextInput
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              style={{
                marginHorizontal: 20,
                flex: 1,
                fontSize: 18,
                paddingHorizontal: 20,
              }}
              placeholder="Fullname"
            />
          </View>
          <View style={{width, height: 1, backgroundColor: 'grey'}} />

          <View
            style={{flexDirection: 'row', paddingHorizontal: 30, padding: 25}}>
            <Image
              tintColor={Colors.color5}
              resizeMode="contain"
              style={{width: 30, height: 30}}
              source={require('../assets/Icons/mail.png')}
            />
            <TextInput
              value={this.state.email}
              onChangeText={email => this.setState({email})}
              editable={false}
              opacity={0.5}
              style={{
                marginHorizontal: 20,
                flex: 1,
                fontSize: 18,
                paddingHorizontal: 20,
              }}
              placeholder="Email"
            />
          </View>
          <View style={{width, height: 1, backgroundColor: 'grey'}} />
          <View
            style={{flexDirection: 'row', paddingHorizontal: 30, padding: 25}}>
            <Image
              tintColor={Colors.color5}
              style={{width: 30, height: 30}}
              source={require('../assets/Icons/phone.png')}
            />
            <TextInput
              onChangeText={phone => this.setState({phone})}
              value={this.state.phone}
              style={{
                marginHorizontal: 20,
                flex: 1,
                fontSize: 18,
                paddingHorizontal: 20,
              }}
              placeholder="Phone"
            />
          </View>
          <View style={{width, height: 1, backgroundColor: 'grey'}} />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
          {this.state.isLoading ? (
            <ActivityIndicator size="large" color={Colors.color5} />
          ) : (
            <CustomButton
              onPress={this.profileUpdate}
              title={'Update'}
              buttonStyle={{
                marginHorizontal: 85,
                alignSelf: 'center',
                width: '90%',
              }}
            />
          )}
          <CustomButton
            onPress={this.Logout}
            title={'Logout'}
            buttonStyle={{
              marginHorizontal: 85,
              alignSelf: 'center',
              width: '90%',
            }}
          />
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    saveUser: data => {
      dispatch({type: 'SAVE_USER', payload: data});
    },
    savedPage: data => {
      dispatch({type: 'SAVED_LAST_PAGE', payload: data});
    },
    StartOver: data => {
      dispatch({type: 'START_OVER', payload: data});
    },
    QuranData: data => {
      dispatch({type: 'SAVE_QURAN_DATA', payload: data});
    },
    QuranAudioData: data => {
      dispatch({type: 'SAVE_QURAN_AUDIO_DATA', payload: data});
    },
    QuranAudioData2: data => {
      dispatch({type: 'SAVE_QURAN_AUDIO_DATA2', payload: data});
    },
    QuranTranslationData: data => {
      dispatch({type: 'SAVE_TRANSLATION_DATA', payload: data});
    },
  };
};
const mapStateToProps = ({reducer}) => {
  return {
    user: reducer.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
