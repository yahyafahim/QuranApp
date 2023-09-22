import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Colors, NavService} from '../config';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
const palendrom = text => {
  console.log('text', text);
  if (text.length == 1) {
    return true;
  } else {
    for (let i = 0; i <= text.length; i++) {
      console.log('A', text[i], text[text.length - 1]);
      if (text[i] === text[text.length - 1]) {
        const a = text.replaceAll(text[i], '');
        console.log('reo', a);
        palendrom(a);
      }
    }
  }
  return false;
};

export class Dashboard extends Component {
  state = {
    renderNumber: 10,
  };

  componentDidMount() {
    console.log(palendrom('civic'));
  }
  render() {
    const {width} = Dimensions.get('screen');
    return (
      <View
        style={{flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20}}>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <Image
            style={{width: 30, height: 30}}
            source={require('../assets/Icons/drawer.png')}
          /> */}
          <View style={{width: 30, height: 30}} />
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: Colors.color5}}>
            QURAN
          </Text>
          {/* <TouchableOpacity
            onPress={() => {
              NavService.navigate('Profile');
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/Icons/profile.png')}
            />
          </TouchableOpacity> */}
          <View style={{width: 30, height: 30}} />
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '300',
              color: Colors.dimGray,
              marginTop: 20,
            }}>
            Asslamualaikum
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 24,
              color: Colors.color5,
              fontWeight: 'bold',
            }}>
            {this.props?.user?.fullname}
          </Text>
        </View>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{borderRadius: 10, flexDirection: 'row', marginTop: 20}}
          colors={['#DF98FA', '#B27DFC', '#9055FF']}>
          <View style={{padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                source={require('../assets/Icons/Group.png')}
                style={{width: 20, height: 20}}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 17,
                  color: Colors.white,
                  fontWeight: 'bold',
                }}>
                Last Read
              </Text>
            </View>
            <Text
              style={{
                marginTop: 20,
                color: Colors.white,
                fontSize: 20,
                fontWeight: '500',
              }}>
              Start from there
            </Text>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Pdf');
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: Colors.color5,
                padding: 10,
                borderRadius: 20,
                paddingHorizontal: 15,
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.white, fontSize: 15}}>Continue</Text>
              <Image
                tintColor={Colors.white}
                source={require('../assets/Icons/arrow.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Image
              style={{alignSelf: 'flex-end'}}
              source={require('../assets/Icons/qicon.png')}
            />
          </View>
        </LinearGradient>
        <ScrollView
          style={{marginTop: 10}}
          contentContainerStyle={{paddingBottom: 30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Quran');
              }}
              style={{
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: '#DF98FA30',
                borderRadius: 10,
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.color5,
                }}>
                Quran
              </Text>
              <Image
                style={{alignSelf: 'flex-end'}}
                source={require('../assets/Icons/QICON2.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Listen');
              }}
              style={{
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: '#DF98FA30',
                borderRadius: 10,
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.color5,
                }}>
                listening
              </Text>
              <Image
                resizeMode="contain"
                style={{alignSelf: 'flex-end', width: 80, height: 80}}
                source={require('../assets/Icons/headphone.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Translation');
              }}
              style={{
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: '#DF98FA30',
                borderRadius: 10,
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.color5,
                }}>
                Translation
              </Text>
              <Image
                resizeMode="contain"
                style={{alignSelf: 'flex-end', width: 80, height: 80}}
                source={require('../assets/Icons/translation.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Bookmarks');
              }}
              style={{
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: '#DF98FA30',
                borderRadius: 10,
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.color5,
                }}>
                Bookmark
              </Text>
              <Image
                style={{
                  alignSelf: 'flex-end',
                  width: 80,
                  height: 80,
                }}
                source={require('../assets/Icons/bg3.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Pdf');
              }}
              style={{
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: '#DF98FA30',
                borderRadius: 10,
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.color5,
                  // textAlign: 'center',
                }}>
                Quran with Tajdeed
              </Text>
              <Image
                style={{alignSelf: 'flex-end'}}
                source={require('../assets/Icons/QICON2.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                NavService.navigate('Audio');
              }}
              style={{
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: '#DF98FA30',
                borderRadius: 10,
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.color5,
                }}>
                surah with audio
              </Text>
              <Image
                style={{
                  alignSelf: 'flex-end',
                  width: 80,
                  height: 80,
                }}
                source={require('../assets/Icons/audio.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    saveUser: data => {
      dispatch({type: 'SAVE_USER', payload: data});
    },
  };
};
const mapStateToProps = ({reducer}) => {
  return {
    user: reducer?.user,
  };
};
// export default Dashboard;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
