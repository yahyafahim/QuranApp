import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icons from '../assets/Icons';
import {Colors, Fonts, Shadows} from '../config';

export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {width} = Dimensions.get('screen');

  return (
    <View style={{width: '76%', alignItems: 'center'}}>
      <View
        style={{
          width: width - 109,
          backgroundColor: Colors.white,
          paddingHorizontal: 15,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderLeftWidth: 0,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Colors.color5 + 70,
          ...props.containerStyle,
        }}>
        {props?.icon && (
          <Image
            source={props?.icon}
            style={{
              width: 18,
              height: 18,
              resizeMode: 'contain',
              tintColor: Colors.icon,
              marginRight: 10,
            }}
          />
        )}
        <TextInput
          secureTextEntry={hidden}
          style={{
            flex: 1,
            height: 48,
            color: Colors.black,
            // fontFamily: Fonts.regular,
          }}
          placeholderTextColor={Colors.lavenderGray}
          {...props}
        />
        {props.isPassword && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.8}
            onPress={() => setHidden(!hidden)}>
            <Image
              source={hidden ? Icons.eyeHidden : Icons.eyeShow}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                alignSelf: 'center',
                tintColor: Colors.dimGray,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
