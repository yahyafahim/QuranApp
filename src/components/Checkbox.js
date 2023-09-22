import React from 'react';
import {TouchableOpacity, Image, LayoutAnimation} from 'react-native';
import Icons from '../assets/Icons';
import {Colors, Shadows} from '../config';

const Checkbox = ({isChecked, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        LayoutAnimation.linear();
        onPress();
      }}
      style={{
        height: 20,
        width: 20,
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.shadow3,
      }}>
      {isChecked && (
        <Image
          source={Icons.check}
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
            tintColor: Colors.black,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
