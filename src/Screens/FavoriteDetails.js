import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, NavService} from '../config';
import {connect} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export class FavoriteDetails extends Component {
  render() {
    const RenderItem = ({item, index}) => {
      console.log('ITEM', item);
      onDelete = () => {
        let arr = this.props.favouriteData;
        arr.splice(index, 1);
        this.props.SavefavouriteData([...this.props.favouriteData]);
      };

      return (
        <TouchableOpacity
          onPress={() => {
            // NavService.navigate('SurahDetailsColor', {item});
          }}
          style={{
            marginBottom: 4,
            margin: 10,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: Colors.dimGray + 30,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.black, fontWeight: 600}}>
              Ayat no : {item.number}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: Platform.OS === 'ios' ? 'noorehira' : 'kitab',
                color: Colors.black,
                textAlign: 'center',
                fontSize: 20,
              }}>
              {item?.text}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text style={{color: Colors.black}}>{item.ayahs[0].page}</Text> */}
            <TouchableOpacity
              onPress={onDelete}
              style={{
                backgroundColor: Colors.white,

                borderRadius: 10,
                padding: 8,
                marginLeft: 10,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 15, height: 15}}
                source={require('../assets/Icons/delete.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    };

    const arrayUniqueByKey = [
      ...new Map(
        this.props.favouriteData.map(item => {
          const oo = item?.number;
          // console.log('item', oo);
          return [item?.number, item];
        }),
      ).values(),
    ];
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
              paddingTop: getStatusBarHeight() + 20,
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
              Favourite Ayahs
            </Text>
          </ImageBackground>
        </LinearGradient>
        <View style={{flex: 1}}>
          <FlatList
            // keyExtractor={(item, index) => index.toString()}
            // key={this.props.bookMarkedData}
            renderItem={({item, index}) => (
              <RenderItem item={item} index={index} />
            )}
            data={arrayUniqueByKey}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({reducer}) => {
  console.log('reducer', reducer.bookMarkedData);
  return {
    bookMarkedData: reducer?.bookMarkedData,
    favouriteData: reducer?.favouriteData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SavefavouriteData: data => {
      dispatch({type: 'SAVE_FAVOURITE_DATA', payload: data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteDetails);
