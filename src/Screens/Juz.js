import {FlatList, Image, ImageBackground, Text, View} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, NavService} from '../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
const arr = [
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },
  {
    juz_no: 1,
    name: 'Juz',
  },
  {
    juz_no: 2,
    name: 'Juz',
  },

  //write it 28 times more with 1 increment
];
const RenderItem = ({item, selected, setSelected, index}) => {
  console.log('se;e', selected);
  return (
    <TouchableOpacity
      onPress={() => {
        setSelected();
        NavService?.navigate('Surah', {item, index, juz: true});
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: index == selected ? Colors.color5 : 'transparent',
        borderRadius: 10,
        marginBottom: 5,
      }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{index + 1}</Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontWeight: '600',
          marginLeft: 10,
          color: Colors.black,
        }}>
        {item.name + ' ' + (index + 1)}
      </Text>
    </TouchableOpacity>
  );
};

export class Juz extends Component {
  state = {
    selected: '0',
  };
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
              Choose your chapter
            </Text>
          </ImageBackground>
        </LinearGradient>
        <View style={{flex: 1, paddingVertical: 50}}>
          <FlatList
            contentContainerStyle={{padding: 10}}
            data={arr}
            renderItem={({item, index}) => (
              <RenderItem
                selected={this.state.selected}
                setSelected={() => this.setState({selected: index})}
                index={index}
                item={item}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

export default Juz;
