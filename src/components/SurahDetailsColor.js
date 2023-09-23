import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, NavService} from '../config';
import {connect} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const RenderItems = ({
  item,
  index,
  onLongPress,
  onPress,
  pageNumber,
  data1,
}) => {
  let data = item.text;
  if (item.page == 2 || item.page == 1) {
    data = item.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '');
  }

  const letterColors = {
    // ب: 'lightGreen',
    پ: 'green',
    ت: 'blue',
    ث: 'purple',
    ج: 'orange',
    چ: 'pink',
    ح: 'brown',
    خ: 'camel',
    // Add more letters and colors as needed
  };

  //   useEffect(() => {
  //     I18nManager.forceRTL(false);
  //   }, []);
  letterColors['ّ'] = '#d4651e';
  letterColors['ْ'] = '#77953c';
  letterColors['ٓ'] = 'red';
  //   console.log(index == data1?.length - 1);

  return (
    <Text
      selectionColor={Colors.color5}
      //   onLongPress={() => {
      //     onLongPress(index, item.number);
      //   }}
      //   onPress={onPress}
      duration={300}
      key={index}
      style={{
        // padding: 10,
        textAlign: 'justify',
        writingDirection: 'rtl',
        direction: 'rtl',
        fontFamily: Platform.OS == 'android' ? 'kitab' : 'noorehira',
        fontSize: item.page == 1 || item.page == 2 ? 32 : 30,
      }}>
      {data.split('').map((item, charindex) => {
        return (
          <Text
            key={charindex}
            style={{
              //   lineHeight: 50,
              color: letterColors[item],
            }}>
            {item}
          </Text>
        );
      })}
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'noorehira',
          color: Colors.color5,
          fontWeight: 'bold',
        }}>
        {' ( '}
        {item.number}
        {' ) '}
      </Text>
    </Text>
  );
};

const SurahDetailsColor = props => {
  const item = props.route.params.item;
  console.log(item?.surahs[item?.number]?.number);
  console.log(item.ayahs[0].surah.number);
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
            Surah Details
          </Text>
        </ImageBackground>
      </LinearGradient>
      <View style={{flex: 8.5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
            maxWidth: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '800',
              color: Colors.color5,
            }}>
            <Text style={{fontFamily: 'noorehira', fontSize: 18}}>
              {item?.surahs[item?.ayahs[0]?.surah?.number]?.number}
            </Text>{' '}
            {item.surahs[item?.ayahs[0]?.surah?.number]?.name}
            <Text> {item?.surahs[item?.ayahs[0]?.surah?.number]?.number}</Text>
          </Text>
          <Text
            style={{
              fontSize: 18,
              flex: 1,
              fontWeight: '800',
              color: Colors.color5,
              textAlign: 'center',
              marginRight: 15,
            }}>
            {item?.ayahs[0]?.page}
          </Text>
          <Text
            style={{
              // textAlign: 'center',
              fontSize: 16,
              fontWeight: '800',
              color: Colors.color5,
              fontFamily: '_PDMS_Saleem_QuranFont',
            }}>
            Juz
            {' ' + item?.ayahs[0]?.juz}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderWidth: 3,
            borderColor: Colors.color5,
            margin: 10,
            marginBottom: 20,

            borderStyle: 'dashed',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 3,
              borderColor: Colors.color5,
              margin: 3,

              borderStyle: 'dashed',
              // backgroundColor: 'red',
            }}>
            <ScrollView
              //   key={this.state.pageNumber}
              contentContainerStyle={{
                paddingBottom: 5,
                flexGrow: 1,
              }}
              style={{flex: 1, marginTop: 10}}>
              {item?.number == 1 || item?.number == 2 ? (
                <View
                  style={{
                    marginTop: 20,
                  }}>
                  <ImageBackground
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: 100,
                    }}
                    source={require('../assets/Icons/tttt1.png')}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 24,
                        fontFamily: '_PDMS_Saleem_QuranFont',
                      }}>
                      بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </Text>
                  </ImageBackground>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row-reverse',
                      // alignItems,
                    }}>
                    <Text
                      style={{
                        padding: 10,
                        textAlign: 'justify',
                        fontSize: 30,
                        writingDirection: 'rtl',
                      }}>
                      {item?.ayahs?.map((item, index) => {
                        {
                          /* console.log(item);
                        if (item.page == 1) {
                          return null;
                        } */
                        }

                        return (
                          <RenderItems
                            // pageNumber={this.state.pageNumber}
                            item={item}
                            index={index}
                            // onPress={() => {
                            //   this.setState({isLongPress: false});
                            // }}
                            // onLongPress={this.onLongPress}
                            // data1={this.state.data.ayahs}
                          />
                        );
                      })}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text
                  style={{
                    padding: 10,
                    textAlign: 'justify',
                    writingDirection: 'rtl',
                    direction: 'rtl',
                  }}>
                  {item?.ayahs?.map((item, index) => {
                    return (
                      <RenderItems
                        item={item}
                        index={index}
                        // onPress={this.onPress}
                        // onLongPress={this.onLongPress}
                        // data1={this.state.data.ayahs}
                      />
                    );
                  })}
                </Text>
              )}

              {/* <TouchableOpacity
                disabled={item.number == 1}
                onPress={() => {
                  this.setState(
                    {
                      pageNumber: this.state.pageNumber - 1,
                      isPress: false,
                      isLongPress: false,
                      isPlaying: false,
                    },
                    () => {
                      SoundPlayer.stop();
                      this.getData();
                    },
                  );
                  LayoutAnimation.easeInEaseOut();
                }}
                style={{
                  width: 40,
                  height: '100%',
                  position: 'absolute',
                  left: 0,
                  top: 200,
                  height: 300,
                  zIndex: 299,
                }}
              />
              <TouchableOpacity
                disabled={this.state.pageNumber == 604}
                onPress={() => {
                  LayoutAnimation.easeInEaseOut();
                  this.setState(
                    {
                      pageNumber: this.state.pageNumber + 1,
                      isPress: false,
                      isLongPress: false,
                      isPlaying: false,
                    },
                    () => {
                      SoundPlayer.stop();
                      this.getData();
                    },
                  );
                }}
                style={{
                  width: 40,
                  height: '100%',
                  position: 'absolute',
                  top: 200,
                  right: 0,
                  height: 300,
                  zIndex: 299,
                }}
              /> */}
            </ScrollView>

            {/* {this.state.isLongPress ? (
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#12193110',
                    padding: 10,
                    borderRadius: 10,
                    margin: 10,
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
                    <Text style={{color: 'white'}}>{this.state.index + 1}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      disabled={this.state.isPlaying}
                      onPress={this.playSound}>
                      <Image
                        tintColor={Colors.color5}
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={
                          this.state.isPlaying
                            ? require('../assets/Icons/pause1.png')
                            : require('../assets/Icons/Frame.png')
                        }
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        this.setState({isFavourite: !this.state.isFavourite});
                      }}
                      style={{marginLeft: 10}}>
                      <Image
                        tintColor={this.state.isFavourite ? 'red' : 'grey'}
                        resizeMode="contain"
                        style={{width: 30, height: 30}}
                        source={require('../assets/Icons/heart.webp')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    padding: 10,
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: Colors.color5,
                    }}>
                    Translation
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({tValue: 'en.sahih'}, () => {
                          this.myCallback();
                        });
                      }}
                      style={{
                        padding: 10,
                        backgroundColor: Colors.color5,
                        borderRadius: 10,
                        width: 70,
                      }}>
                      <Text style={{color: 'white', textAlign: 'center'}}>
                        English
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({tValue: 'ur.jalandhry'}, () => {
                          this.myCallback();
                        });
                      }}
                      style={{
                        padding: 10,
                        backgroundColor: Colors.color5,
                        borderRadius: 10,
                        width: 70,
                      }}>
                      <Text style={{color: 'white', textAlign: 'center'}}>
                        Urdu
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.verse ? (
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '800',
                          textAlign: 'center',
                        }}>
                        {this.state.verse}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SurahDetailsColor;
