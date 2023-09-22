import React, {Component, PureComponent, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Text,
  View,
} from 'react-native';
import getApi from '../redux/RequestTypes/get';
import {TouchableOpacity, Image} from 'react-native';
import {Colors, NavService} from '../config';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SoundPlayer from 'react-native-sound-player';

const RenderItems = ({item, index}) => {
  const [isFavourite, setisFavourite] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  // console.log('props', item);
  const playSound = () => {
    setisPlaying(true);
    SoundPlayer.playUrl(item.audio);
    SoundPlayer.onFinishedPlaying(() => {
      setisPlaying(false);
      console.log('finished playing');
    });

    SoundPlayer.getInfo(i => {
      console.log('info', i);
    });
  };
  useEffect(() => {
    return () => {
      SoundPlayer.stop();
    };
  }, []);

  return (
    <View
      style={{
        marginBottom: 10,
        margin: 10,
        padding: 10,
        borderBottomColor: Colors.dimGray,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flex: 1,
          padding: 10,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.color5,
          }}>
          {item?.text}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#12193110',
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            backgroundColor: Colors.color5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
            borderRadius: 30,
          }}>
          <Text style={{color: 'white'}}>{index + 1}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={playSound}>
            <Image
              tintColor={Colors.color5}
              resizeMode="contain"
              style={{width: 30, height: 30}}
              source={
                isPlaying
                  ? require('../assets/Icons/pause1.png')
                  : require('../assets/Icons/Frame.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setisFavourite(!isFavourite);
            }}
            style={{marginLeft: 10}}>
            <Image
              tintColor={isFavourite ? 'red' : 'grey'}
              resizeMode="contain"
              style={{width: 30, height: 30}}
              source={require('../assets/Icons/heart.webp')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export class AudioInfo extends PureComponent {
  state = {
    arabicData: [],
    urduData: [],
    finalDta: [],
    isToffle: false,
    value: 'English',
    apiValue: 'en.asad',
    isFavorite: false,
    renderNumber: 10,
    isLoading: true,
  };

  getArabicData = async () => {
    const index = this.props.route.params.index + 1;
    console.log('index', index);
    const res = await getApi(`https://api.alquran.cloud/v1/surah/${index}`);
    // console.log('res', res.data.ayahs);
    this.setState({arabicData: res.data.ayahs});
  };
  getUrdeData = async () => {
    const index = this.props.route.params.index + 1;
    // console.log('index', index);
    const res = await getApi(
      `https://api.alquran.cloud/v1/surah/${index}/${this.state.apiValue}`,
    );
    // console.log('res', res.data.ayahs);
    this.setState({urduData: res.data.ayahs}, () => {
      if (this.state.urduData && this.state.arabicData) {
        let arr = [];
        arr = this.state.arabicData.map((e, i) => [e, this.state.urduData[i]]);
        // console.log('arr', arr);
        this.setState({finalDta: arr});
      }
    });
  };
  componentDidMount() {
    // this.getArabicData();
    // this.getUrdeData();
  }
  render() {
    const item = this.props?.route?.params?.item;
    const index = this.props?.route?.params?.index;
    const arr = this.props?.route?.params?.arr;
    const data = arr[index]?.ayahs;
    // console.log('arr', data);

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1.3,
            backgroundColor: Colors.color5,
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 30,
            paddingTop: getStatusBarHeight(),
          }}>
          <TouchableOpacity
            onPress={() => {
              NavService.goBack();
            }}>
            <Image
              tintColor={Colors.white}
              style={{width: 20, height: 20}}
              source={require('../assets/Icons/back.png')}
            />
          </TouchableOpacity>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {item?.name}
            </Text>
          </View>
          <View style={{width: 30, height: 30}} />
        </View>

        <View style={{flex: 8}}>
          <FlatList
            style={{flex: 1}}
            ListEmptyComponent={() => (
              <View
                style={{
                  marginTop: 20,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20}}>
                  its take time for loading please wait a while
                </Text>
              </View>
            )}
            ListFooterComponent={() => {
              if (this.state.isLoading)
                return (
                  <ActivityIndicator color={Colors.color5} size={'large'} />
                );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              this.setState({
                // renderNumber: this.state.renderNumber + 10,
                isLoading: false,
              });
            }}
            initialNumToRender={this.state.renderNumber}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item, index}) => (
              <RenderItems item={item} index={index} />
            )}
          />
        </View>
      </View>
    );
  }
}

export default AudioInfo;
