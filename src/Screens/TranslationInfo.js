import React, {Component, PureComponent} from 'react';
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

const RenderItems = ({item, index}) => {
  console.log('item, index', item, index);
  return (
    <View
      onPress={() => {
        NavService.navigate('Translationinfo', {item, index});
      }}
      style={{
        marginBottom: 10,
        margin: 10,
        padding: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
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
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.color5,
            fontFamily: 'noorehira',
          }}>
          {item[0]?.text}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          paddingHorizontal: 15,
        }}>
        <Text style={{textAlign: 'center', fontSize: 18, fontFamily: 'kitab'}}>
          {item[1]?.text}
        </Text>
      </View>
    </View>
  );
};

export class TranslationInfo extends PureComponent {
  state = {
    arabicData: [],
    urduData: [],
    finalDta: [],
    isToffle: false,
    value: 'English',
    apiValue: 'en.asad',
    renderNumber: 10,
    isLoading: true,
  };

  getArabicData = async () => {
    const index = this.props.route.params.index + 1;
    console.log('index', index);
    const res = await getApi(`https://api.alquran.cloud/v1/surah/${index}`);
    this.setState({arabicData: res.data.ayahs});
  };
  getUrdeData = async () => {
    const index = this.props.route.params.index + 1;
    const res = await getApi(
      `https://api.alquran.cloud/v1/surah/${index}/${this.state.apiValue}`,
    );
    this.setState({urduData: res.data.ayahs}, () => {
      if (this.state.urduData && this.state.arabicData) {
        let arr = [];
        arr = this.state.arabicData.map((e, i) => [e, this.state.urduData[i]]);
        this.setState({finalDta: arr});
      }
    });
  };
  componentDidMount() {
    this.getArabicData();
    this.getUrdeData();
  }
  render() {
    const item = this.props.route.params.item;
    console.log('item', this.state.finalDta);
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1.3,
            backgroundColor: Colors.color5,
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
            <View
              style={{
                width: 130,
                height: 2,
                backgroundColor: 'white',
                marginTop: 5,
                borderRadius: 130,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
                {this.state.value}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.easeInEaseOut();
                  this.setState(
                    {
                      isToffle: !this.state.isToffle,
                      value: this.state.isToffle ? 'English' : 'Urdu',
                      apiValue: this.state.isToffle ? 'en.asad' : 'ur.maududi',
                    },
                    () => {
                      this.getArabicData();
                      this.getUrdeData();
                    },
                  );
                }}
                style={{
                  marginLeft: 10,
                  borderColor: 'white',
                  borderWidth: 2,
                  borderRadius: 15,
                  padding: 3,
                  width: 50,
                  backgroundColor: this.state.isToffle
                    ? 'white'
                    : 'transparent',
                  alignItems: this.state.isToffle ? 'flex-end' : 'flex-start',
                }}>
                <Image
                  resizeMode="contain"
                  tintColor={this.state.isToffle ? Colors.color5 : 'white'}
                  style={{width: 20, height: 20}}
                  source={require('../assets/Icons/circle.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: 30, height: 30}} />
        </View>

        <View style={{flex: 8}}>
          <FlatList
            key={this.state.finalDta}
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
            initialNumToRender={this.state.renderNumber}
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
            keyExtractor={(item, index) => index.toString()}
            data={this.state.finalDta}
            renderItem={({item, index}) => (
              <RenderItems item={item} index={index} />
            )}
          />
        </View>
      </View>
    );
  }
}

export default TranslationInfo;
