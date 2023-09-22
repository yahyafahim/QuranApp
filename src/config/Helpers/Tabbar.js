import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../Colors';
import Icons from '../../assets/Icons';

export default class Tabbar extends React.Component {
  render() {
    const {state, navigation} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: Colors.white,
          borderTopWidth: 2,
          borderTopColor: Colors.lavenderGray,
        }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };
          let imageSrc = Icons.home;
          if (route.name === 'LiveRoom') imageSrc = Icons.liveRoom;
          if (route.name === 'Video') imageSrc = Icons.video;
          if (route.name === 'Setting') imageSrc = Icons.setting;

          let title = route.name;
          if (route.name === 'LiveRoom') title = 'Live Room';

          return (
            <TouchableOpacity
              key={index}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.tabs}>
              <Image
                source={imageSrc}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: isFocused ? Colors.melon : Colors.lavenderGray,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: isFocused ? Colors.melon : Colors.lavenderGray,
                }}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 5,
    height: 65,
  },
});
