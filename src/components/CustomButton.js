import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Colors, Fonts, Shadows} from '../config';
const {width} = Dimensions.get('screen');
import Text from './TextTranslator';

export default function CustomButton(props) {
  const {color, title, onPress, buttonStyle, textStyle, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          width: '100%',
          // width: 120,
          marginTop: 15,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          backgroundColor: Colors.color5,
          ...Shadows.shadow5,
        },
        buttonStyle,
      ]}>
      <Text style={[{fontSize: 22, color: Colors.white}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function CustomButtonTransparent(props) {
  const {color, title, onPress, buttonStyle, textStyle, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          alignSelf: 'center',
          width: width - 50,
          marginTop: 15,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          borderWidth: 0.5,
          borderColor: Colors.lavenderGray,
        },
        buttonStyle,
      ]}>
      <Text
        style={[
          {
            fontSize: 22,
            color: Colors.lavenderGray,
            fontFamily: Fonts.boldItalic,
          },
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
