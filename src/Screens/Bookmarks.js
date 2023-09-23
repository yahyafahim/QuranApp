import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, NavService} from '../config';

export class Bookmarks extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: getStatusBarHeight() + 30,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              tintColor={Colors.color5}
              style={{width: 20, height: 20}}
              source={require('../assets/Icons/back.png')}
            />
          </TouchableOpacity>
          <Text style={{color: Colors.color5, fontSize: 20, fontWeight: '800'}}>
            Bookmarks
          </Text>
          <View style={{width: 20, height: 20}} />
        </View>
        <TouchableOpacity
          onPress={() => {
            NavService.navigate('BookmarkedData');
          }}
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            marginTop: 30,
            paddingHorizontal: 20,
          }}>
          <Image
            tintColor={Colors.color5}
            style={{width: 30, height: 30}}
            source={require('../assets/Icons/folder.png')}
          />
          <View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: Colors.color5,
              }}>
              My Favorites Juz
            </Text>
            <Text style={{marginLeft: 10, fontSize: 12, marginTop: 5}}>
              My items
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            NavService.navigate('FavoriteDetails');
          }}
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          <Image
            tintColor={Colors.color5}
            style={{width: 30, height: 30}}
            source={require('../assets/Icons/folder.png')}
          />
          <View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '700',
                color: Colors.color5,
              }}>
              My Favorites Ayahs
            </Text>
            <Text style={{marginLeft: 10, fontSize: 12, marginTop: 5}}>
              My items
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Bookmarks;
