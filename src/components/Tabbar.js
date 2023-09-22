import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../config';
const {width, height} = Dimensions.get('screen');

class Tabbar extends React.Component {
  render() {
    const {state, descriptors, navigation} = this.props;

    return (
      <View
        style={{
          backgroundColor: 'transparent',

          height: 80,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {state.routes.map((route, index) => {
            console.log('tab', route);
            const {options} = descriptors[route.key];
            const label = route.name;
            const isFocused = state.index === index;
            // console.log(route);
            const onPress1 = () => {
              navigation.navigate(route.name);
            };

            let imageSrc = [
              require('../assets/Icons/ingredients.png'),
              require('../assets/Icons/loadDefaults.png'),
              require('../assets/Icons/home.png'),
              require('../assets/Icons/report.png'),
              require('../assets/Icons/users.png')
            ]

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onPress1}>
                <Image
                  source={imageSrc[index]}
                  style={{
                    width: 22,
                    height: 20,
                    marginBottom: 5,
                    resizeMode: 'contain',
                    tintColor: isFocused ? Colors.color5 : '#9B96AB',
                  }}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.color5 : '#6B6B6B',
                    fontSize: 10,
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    maxWidth: '80%',
                    textAlign: 'center',
                  }}
                  numberOfLines={2}>
                  {route.name === 'LoadDefaults' ? 'Load Defaults' : label}
                </Text>
                <View
                  style={{
                    marginTop: 3,
                    height: 5,
                    width: 5,
                    borderRadius: 50,
                    backgroundColor: isFocused ? Colors.color5 : 'transparent',
                  }}></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}
export default Tabbar;

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
  },
  tab: {
    width: '20%',
    paddingVertical: 4,
    zIndex: 99,
    overflow: 'visible',
    alignItems: 'center',
  },
});
