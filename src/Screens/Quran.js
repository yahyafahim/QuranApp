import React, {PureComponent} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  LayoutAnimation,
} from 'react-native';
import {Colors, NavService} from '../config';
import {ScrollView} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SoundPlayer from 'react-native-sound-player';

// const RenderItems = ({item, index}) => {
//   // console.log(item?.englishName);
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         NavService.navigate('Surah', {item});
//       }}
//       style={{
//         marginBottom: 10,
//         margin: 10,
//         padding: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomColor: Colors.dimGray,
//         borderBottomWidth: 1,
//       }}>
//       <View
//         style={{
//           width: 30,
//           height: 30,
//           borderRadius: 5,
//           backgroundColor: Colors.color5 + 80,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text style={{color: Colors.white, fontWeight: 600}}>{index + 1}</Text>
//       </View>
//       <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
//         <Text>{item?.englishName}</Text>
//         <Text style={{color: Colors.dimGray, marginTop: 5}}>
//           {item?.englishNameTranslation}
//         </Text>
//       </View>
//       <Text style={{color: Colors.color5, fontWeight: '700', fontSize: 18}}>
//         {item?.name}
//       </Text>
//     </TouchableOpacity>
//   );
// };
const RenderItems = ({item, index, onLongPress, onPress, pageNumber}) => {
  let data = item.text;
  if (pageNumber == 2 && index == 0) {
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

  letterColors['ّ'] = 'red';
  letterColors['ْ'] = 'orange';
  letterColors['ٓ'] = 'green';

  const a = data.split('').map((item, index) => {
    return (
      <Text
        key={index}
        style={{
          fontSize: pageNumber == 1 || pageNumber == 2 ? 34 : 30,
          textAlign: 'right',
          lineHeight: 50,
          fontFamily: '_PDMS_Saleem_QuranFont',
          writingDirection: 'rtl',
          color: letterColors[item],
        }}>
        {item}
      </Text>
    );
  });

  return (
    <Text
      selectionColor={Colors.color5}
      onLongPress={() => {
        onLongPress(index, item.number);
      }}
      onPress={() => {
        onPress(index, item.number);
      }}
      key={index}
      style={{
        padding: 10,
        textAlign: 'justify',
        writingDirection: 'rtl',
        direction: 'rtl',
        // fontFamily: 'noorehira',
        fontSize: 30,
      }}>
      {data.split('').map((item, index) => {
        return (
          <Text
            key={index}
            style={{
              fontSize: pageNumber == 1 || pageNumber == 2 ? 34 : 30,
              textAlign: 'right',
              lineHeight: 50,
              // fontFamily: '_PDMS_Saleem_QuranFont',
              writingDirection: 'rtl',
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
        {'   (  '}
        {item.number}
        {'  )   '}
      </Text>
    </Text>
  );
};

class Quran extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      renderNumber: 10,
      isLoading: true,
      reRenderCount: 0,
      isLoader: true,
      pageNumber: 1,
      isPress: false,
      isLongPress: false,
      itemNumber: null,
      tValue: '',
      isPlaying: false,
      isFavourite: false,
      verse: '',
      index: null,
      surahName: '',
    };
  }

  getData = async () => {
    fetch(
      `https://api.alquran.cloud/v1/page/${this.state.pageNumber}/quran-uthmani`,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json.data);
        console.log(json.data?.ayahs[0].surah?.name);

        this.setState({
          data: json.data,
          isLoading: false,
          surahName: json.data?.ayahs[0].surah?.name,
        });
        LayoutAnimation.easeInEaseOut();
      });
  };

  playSound = async () => {
    await fetch(
      'https://api.alquran.cloud/v1/ayah/' +
        this.state.itemNumber +
        '/ar.alafasy',
    ).then(res => {
      res.json().then(res => {
        this.setState({isPlaying: true});
        SoundPlayer.playUrl(res.data.audio);
        SoundPlayer.onFinishedPlaying(() => {
          this.setState({isPlaying: false});
        });
        SoundPlayer.getInfo(i => {
          console.log('info', i);
        });
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  increaseReRenderCount = () => {
    this.setState(prevState => ({
      reRenderCount: prevState.reRenderCount + 1,
    }));
  };

  onLongPress = (index, itemNumber) => {
    LayoutAnimation.easeInEaseOut();
    if (this.state.isPress) {
      this.setState({isPress: false});
    } else {
      this.setState({
        isLongPress: !this.state.isLongPress,
        index,
        itemNumber,
        verse: '',
      });
    }
  };

  onPress = (index, itemNumber) => {
    LayoutAnimation.easeInEaseOut();
    if (this.state.isLongPress) {
      this.setState({isLongPress: false});
    } else {
      this.setState({isPress: !this.state.isPress, index, itemNumber});
    }
  };

  componentWillUnmount() {
    SoundPlayer.stop();
  }

  myCallback = () => {
    fetch(
      'https://api.alquran.cloud/v1/ayah/' +
        this.state.itemNumber +
        '/' +
        this.state.tValue,
    )
      .then(res => res.json())
      .then(res => {
        this.setState({verse: res.data.text});
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
            backgroundColor: Colors.color5,
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 30,
            paddingBottom: 15,
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
          <Text
            style={{
              color: Colors.white,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              flex: 1,
            }}>
            Quran
          </Text>
          <View style={{width: 30, height: 30}} />
        </View>
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
                fontSize: 18,
                fontWeight: '800',
                color: Colors.color5,
              }}>
              {this.state.data.edition?.englishName}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: Colors.color5,
              }}>
              {this.state.pageNumber}
            </Text>
            <Text
              style={{
                // textAlign: 'center',
                fontSize: 28,
                fontWeight: '800',
                color: Colors.color5,
                fontFamily: '_PDMS_Saleem_QuranFont',
              }}>
              {this.state.surahName}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 5,
              borderColor: Colors.color5,
              margin: 10,
              marginBottom: 20,
              // backgroundColor: 'red',
            }}>
            <ScrollView
              key={this.state.pageNumber}
              contentContainerStyle={{
                paddingBottom: 5,
                flexGrow: 1,
              }}
              style={{flex: 1, marginTop: 10}}>
              {this.state.pageNumber == 1 || this.state.pageNumber == 2 ? (
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
                    source={require('../assets/Icons/titt.png')}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: 24,
                        fontFamily: '_PDMS_Saleem_QuranFont',
                      }}>
                      بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </Text>
                  </ImageBackground>
                  <View style={{marginTop: 20}}>
                    <Text
                      style={{
                        padding: 10,
                        textAlign: 'justify',
                        // borderBottomColor: Colors.color5,
                        // borderBottomWidth: 4,
                        // fontFamily: '_PDMS_Saleem_QuranFont',
                        fontSize: 30,
                        writingDirection: 'rtl',
                      }}>
                      {this.state?.data?.ayahs?.map((item, index) => {
                        if (this.state.pageNumber == 1 && index == 0) {
                          return null;
                        }

                        return (
                          <RenderItems
                            pageNumber={this.state.pageNumber}
                            item={item}
                            index={index}
                            onPress={this.onPress}
                            onLongPress={this.onLongPress}
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
                  {this.state?.data?.ayahs?.map((item, index) => {
                    return (
                      <RenderItems
                        item={item}
                        index={index}
                        onPress={this.onPress}
                        onLongPress={this.onLongPress}
                      />
                    );
                  })}
                </Text>
              )}

              <TouchableOpacity
                disabled={this.state.pageNumber == 1}
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
                  width: 30,
                  height: '100%',
                  position: 'absolute',
                  left: 0,
                  top: 200,
                  height: 300,
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
                  width: 30,
                  height: '100%',
                  position: 'absolute',
                  top: 200,
                  right: 0,
                  height: 300,
                }}
              />
            </ScrollView>

            {this.state.isPress ? (
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
            ) : null}
            {this.state.isLongPress ? (
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
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

export default Quran;
