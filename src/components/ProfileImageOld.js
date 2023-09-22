import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors} from '../config';

const ProfileImage = ({size = 140, imageUri, name = ' ', style}) => {
  if (imageUri)
    return (
      <View
        style={{
          overflow: 'hidden',
          visibility: 'hidden',
          width: size,
          height: size * 2,
          margin: 20,
          transform: [{rotate: '-120deg'}],
          position: 'absolute',
          top: -size + 2,
          left: -size / 2 + 2.5,
        }}>
        <View
          style={{
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            transform: [{rotate: '240deg'}],
          }}>
          <Image
            source={{uri: imageUri}}
            style={[
              {
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                backgroundColor: Colors.lavenderGray,
                borderColor: Colors.lightGrey,
                transform: [{rotate: '240deg'}],
              },
              style,
            ]}
          />
        </View>
      </View>
    );
  return (
    <View
      style={{
        overflow: 'hidden',
        visibility: 'hidden',
        width: size,
        height: size * 2,
        margin: 20,
        transform: [{rotate: '-120deg'}],
        position: 'absolute',
        top: -size + 2,
        left: -size / 2 + 2.5,
      }}>
      <View
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          transform: [{rotate: '-60deg'}],
        }}>
        <View
          style={[
            {
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              backgroundColor: Colors.melon,
              transform: [{rotate: '-60deg'}],
            },
            style,
          ]}>
          <Text
            numberOfLines={1}
            style={{
              color: Colors.black,
              fontSize: size * 0.75,
              fontWeight: '800',
              width: '100%',
              textAlign: 'center',
              transform: [{rotate: '240deg'}],
              marginTop: size / 2 + 2.5,
            }}>
            {name[0].toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileImage;

{
  /* <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 50,
          borderColor: Colors.dimGray,
          backgroundColor: Colors.melon,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        numberOfLines={1}
        style={{
          color: Colors.black,
          fontSize: size * 0.75,
          fontWeight: '800',
          width: '100%',
          textAlign: 'center',
        }}>
        {name[0].toUpperCase()}
      </Text>
    </View> */
}
