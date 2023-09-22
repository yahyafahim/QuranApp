import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors} from '../config';
import Images from '../assets/Images';

const ProfileImage = ({size = 160, imageUri, name = ' ', style}) => {
  if (imageUri)
    return (
      <View
        style={{
          width: size,
          height: size,
        }}>
        <Image
          source={{uri: imageUri}}
          style={[
            {
              width: size,
              height: size,
              resizeMode: 'cover',
              backgroundColor: Colors.lavenderGray,
              zIndex: -1,
            },
            style,
          ]}
        />
        <Image
          source={Images.profileFrame}
          style={[
            {
              width: size,
              height: size,
              resizeMode: 'cover',
              position: 'absolute',
              zIndex: 99,
            },
            style,
          ]}
        />
      </View>
    );
  return (
    <View
      style={{
        width: size,
        height: size,
      }}>
      <View
        style={[
          {
            width: size,
            height: size,
            backgroundColor: Colors.melon,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: -1,
          },
          style,
        ]}>
        <Text
          numberOfLines={1}
          style={{
            color: Colors.primary,
            fontSize: size * 0.75,
            fontWeight: '800',
            width: '100%',
            textAlign: 'center',
            marginLeft: size * 0.04,
          }}>
          {name[0]?.toUpperCase()}
        </Text>
      </View>
      <Image
        source={Images.profileFrame}
        style={[
          {
            width: size,
            height: size,
            resizeMode: 'cover',
            position: 'absolute',
            zIndex: 99,
          },
          style,
        ]}
      />
    </View>
  );
};

export default ProfileImage;
