import {FlatList, Image, ImageBackground, Text, View} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, NavService} from '../config';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class TajweedRule extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{height: 120}}
          colors={['#14916280', '#14915080', '#149162']}>
          <ImageBackground
            imageStyle={{
              alignSelf: 'flex-end',
              top: '40%',
            }}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
            }}
            // resizeMode="contain"
            source={require('../assets/Icons/Vector.png')}>
            <TouchableOpacity
              onPress={() => {
                NavService.goBack();
              }}>
              <Image
                tintColor={Colors.white}
                resizeMode="contain"
                style={{width: 20, height: 20}}
                source={require('../assets/Icons/back.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: Colors.white,
              }}>
              Tajweed Rule
            </Text>
          </ImageBackground>
        </LinearGradient>
        <View style={{flex: 8.5}}>
          <Image
            source={require('../assets/Icons/tajweedrules.jpeg')}
            resizeMode="contain"
            style={{width: '100%', height: '90%'}}
          />
        </View>
      </View>
    );
  }
}

export default TajweedRule;
