import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icons from '../assets/Icons';
import {Colors, Fonts, NavService} from '../config';
import ProfileImage from './ProfileImage';
import Text from '../components/TextTranslator';
import {useSelector} from 'react-redux';

export function AppBackground({
  children,
  menu = true,
  back = false,
  edit = false,
  done = false,
  childrenContainerStyle = {},
}) {
  const user = useSelector(state => state.reducer.user);
  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      <View
        style={{
          marginTop: getStatusBarHeight(),
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Colors.white,
          padding: 10,
          paddingHorizontal: 20,
        }}>
        {!menu && !back ? null : back ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: edit ? 'space-between' : 'flex-start',
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => NavService.goBack()}>
              <Image
                source={Icons.back}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: Colors.black,
                }}
              />
            </TouchableOpacity>
            {edit && (
              <TouchableOpacity
                onPress={() => NavService.navigate('EditProfile')}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.boldItalic,
                    color: Colors.black,
                  }}>
                  str_Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => NavService.navigate('Profile')}
              style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 45,
                  width: 45,
                }}>
                <ProfileImage
                  size={45}
                  imageUri={user?.avatar}
                  name={user?.fullname}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: Fonts.boldItalic,
                    color: Colors.black,
                  }}>
                  {user?.fullname}
                </Text>
                {user?.isSubscribed != 1 && (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                      color: Colors.dimGray,
                    }}>
                    str_UpgradeMembership
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            {done ? (
              <TouchableOpacity onPress={() => NavService.goBack()}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.boldItalic,
                    color: Colors.black,
                  }}>
                  str_Done
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => NavService.navigate('Notifications')}>
                <View
                  style={{
                    position: 'absolute',
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: Colors.melon,
                    right: 0,
                  }}
                />

                <Image
                  source={Icons.notification}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          ...childrenContainerStyle,
        }}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;
