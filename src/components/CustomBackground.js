import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, NavService} from '../config';

export default ({children, back = true}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.color5 + 40,
        paddingHorizontal: 10,
      }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: getStatusBarHeight(),
        }}
        contentContainerStyle={{
          backgroundColor: Colors.white,
          justifyContent: 'center',
        }}>
        {back && (
          <TouchableOpacity
            onPress={() => NavService.goBack()}
            style={{
              marginLeft: 15,
              marginTop: 15,
            }}>
            <Image
              source={Icons.back}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                tintColor: Colors.black,
              }}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};
