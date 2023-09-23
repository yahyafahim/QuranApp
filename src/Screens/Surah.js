import React, {Component, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  I18nManager,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors, NavService} from '../config';
import {Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import SoundPlayer from 'react-native-sound-player';
import arabicFormatter from 'arabic-formatter';

const RenderItems = ({arr, item, index}) => {
  let data = item.text;
  if (arr.number > 1) {
    data = item.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '');
    console.log('data', data);
  }

  const [verse, setVerse] = useState('');
  const [tValue, setTValue] = useState('');
  const text = 'ّ';
  const madd = text.replace(/ّ/g, 'ٌ');
  const {width} = useWindowDimensions();

  const myCallback = () => {
    fetch('https://api.alquran.cloud/v1/ayah/' + item.number + '/' + tValue)
      .then(res => res.json())
      .then(res => {
        setVerse(res.data.text);
      });
  };

  useEffect(() => {
    myCallback();
  }, [tValue]);

  const playSound = async () => {
    await fetch(
      'https://api.alquran.cloud/v1/ayah/' + item.number + '/ar.alafasy',
    ).then(res => {
      res.json().then(res => {
        setisPlaying(true);
        SoundPlayer.playUrl(res.data.audio);
        SoundPlayer.onFinishedPlaying(() => {
          setisPlaying(false);
        });
        SoundPlayer.getInfo(i => {
          console.log('info', i);
        });
      });
    });
  };
  const screenWidth = Dimensions.get('window').width;
  const maxFontSize = 24; // Maximum font size
  const minFontSize = 16; // Minimum font sizes
  const calculateFontSize = text => {
    // Adjust the font size based on text length and screen width
    const textWidth = text.length * maxFontSize; // Estimated width of the text
    const fontSize = Math.min(
      maxFontSize,
      (screenWidth * maxFontSize) / textWidth,
    );
    return Math.max(minFontSize, fontSize); // Ensure a minimum font size
  };

  const [isLongPress, setisLongPress] = useState(false);
  const [isPress, setisPress] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [isFavourite, setisFavourite] = useState(false);

  const letterColors = {
    ب: 'lightGreen',
    پ: 'green',
    ت: 'blue',
    ث: 'purple',
    ج: 'orange',
    چ: 'pink',
    ح: 'brown',
    خ: 'camel',
    // Add more letters and colors as needed
  };
  letterColors['ّ'] = '#d4651e';
  letterColors['ْ'] = '#77953c';
  letterColors['ٓ'] = 'red';

  const words = data.split(' ');
  return (
    <TouchableOpacity
      style={{
        borderBottomColor: Colors.dimGray,
        borderBottomWidth: 1,
        // flexDirection: 'row-reverse',
        flex: 1,
        paddingHorizontal: 10,
      }}
      onLongPress={() => {
        LayoutAnimation.easeInEaseOut();
        if (isPress) {
          setisPress(false);
        } else {
          setisLongPress(!isLongPress);
        }
      }}
      onPress={() => {
        LayoutAnimation.easeInEaseOut();
        if (isLongPress) {
          setisLongPress(false);
        } else {
          setisPress(!isPress);
        }
      }}
      delayLongPress={1000}>
      <View>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row-reverse',
            // flex: 1,
          }}>
          {words.map((word, wordIndex) => (
            <Text
              // numberOfLines={4}
              style={{
                paddingTop: 10,
                // backgroundColor: 'red',
                // flexWrap: 'wrap',

                // backgroundColor: 'yellow',
              }}
              key={wordIndex}>
              {word.split('').map((letter, letterIndex) => {
                {
                  /* console.log(letter, wordIndex); */
                }

                return (
                  <Text
                    numberOfLines={2}
                    key={letterIndex}
                    style={{
                      color: letterColors[letter],

                      fontSize: calculateFontSize(word),
                      textAlign: 'right',
                      fontFamily:
                        Platform.OS == 'android' ? 'kitab' : 'noorehira',
                    }}>
                    {letter}
                  </Text>
                );
              })}
              {'    '}
            </Text>
          ))}
        </View>
      </View>

      {isPress ? (
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
            <Text style={{color: 'white'}}>{index + 1}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity disabled={isPlaying} onPress={playSound}>
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
            {/* <TouchableOpacity
              onPress={() => {
                LayoutAnimation.easeInEaseOut();
                setisFavourite(!isFavourite);
              }}
              style={{marginLeft: 10}}>
              <Image
                tintColor={isFavourite ? 'red' : 'grey'}
                resizeMode="contain"
                style={{width: 30, height: 30}}
                source={require('../assets/Icons/heart.webp')}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      ) : null}
      {isLongPress ? (
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
                setTValue('en.sahih');
              }}
              style={{
                padding: 10,
                backgroundColor: Colors.color5,
                borderRadius: 10,
                width: 70,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTValue('ur.jalandhry');
              }}
              style={{
                padding: 10,
                backgroundColor: Colors.color5,
                borderRadius: 10,
                width: 70,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Urdu</Text>
            </TouchableOpacity>
          </View>
          {verse ? (
            <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
              <Text
                style={{fontSize: 17, fontWeight: '800', textAlign: 'center'}}>
                {verse}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export class Surah extends Component {
  state = {
    isFavorite: false,
    renderNumber: 10,
    isLoading: true,
    data: [],
    isLoader: true,
  };
  getJuzData = async () => {
    this.setState({isLoading: true});
    fetch(
      `https://api.alquran.cloud/v1/juz/${
        this.props.route.params.index + 1
      }quran-uthmani`,
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({data: res.data, isLoading: false});
      });
  };
  getSurahData = async () => {
    this.setState({isLoading: true});
    fetch(
      `https://api.alquran.cloud/v1/surah/${
        this.props.route.params.index + 1
      }/ar.alafasy`,
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({data: res.data, isLoading: false});
      });
  };
  componentDidMount() {
    if (this.props.route.params.juz) {
      this.getJuzData();
    } else {
      this.getSurahData();
    }
  }
  render() {
    const arr = this.props.route.params.index;
    console.log(arr);
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1.2,
            backgroundColor: Colors.color5,
            paddingTop: getStatusBarHeight(),
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 30,
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
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 5,
              }}>
              {this.props.route.params.juz ? 'Chapter ' : 'Surah '}{' '}
              {this.state.data.number}
            </Text>
            {/* <Image
              tintColor={Colors.white}
              source={require('../assets/Icons/bismillah.png')}
            /> */}
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({isFavorite: !this.state.isFavorite});
            }}>
            {/* <Image
              tintColor={this.state.isFavorite ? 'red' : Colors.white}
              resizeMode="contain"
              source={require('../assets/Icons/heart.webp')}
              style={{width: 35, height: 35}}xx
            /> */}
          </TouchableOpacity>
        </View>
        <View style={{flex: 8, backgroundColor: 'white'}}>
          {this.state.isLoading ? (
            <ActivityIndicator
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              color={Colors.color5}
              size={'large'}
            />
          ) : (
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{
                flexGrow: 1,
                // backgroundColor: 'yellow',
                // justifyContent: 'center',
              }}
              // initialNumToRender={this.state.renderNumber}
              // style={{backgroundColor: 'red'}}
              onEndReachedThreshold={0.9}
              onEndReached={() => {
                // this.setState({renderNumber: this.state.renderNumber + 10});
                this.setState({isLoader: false});
              }}
              ListFooterComponent={() => {
                if (this.state.isLoader)
                  return (
                    <ActivityIndicator color={Colors.color5} size={'large'} />
                  );
              }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state?.data?.ayahs}
              renderItem={({item, index}) => (
                <RenderItems arr={arr} item={item} index={index} />
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Surah;
