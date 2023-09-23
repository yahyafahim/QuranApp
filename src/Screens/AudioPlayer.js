import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import Slider from '@react-native-community/slider';
import {Colors, NavService} from '../config';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';

function secondsToTime(secs) {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  const time = `${obj.m}:${obj.s}`;
  return time;
}

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentPosition: 0,
      duration: null,
      isFavorite: false,
    };
  }

  componentDidMount() {
    SoundPlayer.onFinishedPlaying(() => {
      this.setState({isPlaying: false, currentPosition: 0});
    });
  }

  playAudio = async () => {
    const item = this.props.route.params.item;
    const arr = this.props.route.params.arr;
    const index = this.props.route.params.index;
    console.log('arr', arr);

    try {
      await SoundPlayer.playUrl(arr[index].audio_url);
      this.setState({isPlaying: true}, () => {
        this.updateDuration();
      });
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  updateDuration = () => {
    this.durationInterval = setInterval(() => {
      SoundPlayer.getInfo().then(info => {
        console.log(info);
        if (info.duration) {
          this.setState({
            duration: info.duration,
            currentPosition: info.currentTime,
          });
        }
      });
    }, 1000);
  };

  pauseAudio = async () => {
    try {
      await SoundPlayer.pause();
      this.setState({isPlaying: false});
      clearInterval(this.durationInterval);
    } catch (error) {
      console.log('Error pausing audio:', error);
    }
  };

  onSliderValueChange = value => {
    const {duration} = this.state;
    if (duration) {
      const newPosition = value * duration;
      SoundPlayer.seek(newPosition);
      this.setState({currentPosition: newPosition});
    }
  };

  onForwardValueChange = () => {
    SoundPlayer.getInfo().then(info => {
      if (info.duration) {
        const newPosition = Math.min(info.currentTime + 10, info.duration);
        SoundPlayer.seek(newPosition);
        this.setState({
          currentPosition: newPosition,
        });
      }
    });
  };
  onRewindValueChange = () => {
    SoundPlayer.getInfo().then(info => {
      if (info.duration) {
        const newPosition = Math.max(info.currentTime - 10, 0);
        SoundPlayer.seek(newPosition);
        this.setState({
          currentPosition: newPosition,
        });
      }
    });
  };
  async componentWillUnmount() {
    clearInterval(this.durationInterval);
    await SoundPlayer.stop();
  }

  render() {
    const {isPlaying, currentPosition, duration} = this.state;
    const {audioTitle} = this.props;
    const item = this.props.route.params.item;
    return (
      <View
        style={{
          flex: 1,

          backgroundColor: Colors.color5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: getStatusBarHeight() + 30,
            alignItems: 'center',
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

          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: Colors.white,
            }}>
            Now Playing
          </Text>
          <View style={{width: 30, height: 30}} />
        </View>
        <View
          style={{
            marginTop: 20,
            flex: 1,
            backgroundColor: '#fbe1db',
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            padding: 20,
          }}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#14913220', '#14915080', '#149162']}
            style={{
              marginTop: 10,
              // backgroundColor: '#994EF8',
              width: 350,
              height: 300,
              alignSelf: 'center',
              borderRadius: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 30,
                overflow: 'hidden',
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: Colors.white}}>
                {item.name}
              </Text>
              <Text style={{marginTop: 10, color: Colors.white, fontSize: 16}}>
                {item.meaning}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: Colors.white,
                  }}>
                  بِسمِ اللہِ الرَّحمٰنِ الرَّحِيم
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  //   top: 10,
                  bottom: 0,
                }}>
                <Image
                  resizeMode="stretch"
                  style={{
                    width: 300,
                    height: 150,
                    opacity: 0.5,
                  }}
                  source={require('../assets/Icons/qicon.png')}
                />
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              padding: 5,
              alignItems: 'flex-end',
              paddingHorizontal: 30,
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({isFavorite: !this.state.isFavorite});
              }}>
              <Image
                tintColor={this.state.isFavorite ? 'red' : 'grey'}
                resizeMode="contain"
                style={{width: 40, height: 40}}
                source={require('../assets/Icons/heart.webp')}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: 0}}>
              <Slider
                minimumTrackTintColor="#863ED5"
                style={{width: 300, marginTop: 20}}
                value={duration ? currentPosition / duration : 0}
                onValueChange={this.onSliderValueChange}
                disabled={!isPlaying || !duration}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 300,
                  paddingHorizontal: 10,
                }}>
                <Text>{secondsToTime(Math.floor(currentPosition))}</Text>
                <Text>{secondsToTime(Math.floor(duration))}</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40,
              paddingHorizontal: 40,
            }}>
            <TouchableOpacity onPress={this.onRewindValueChange}>
              <Image
                tintColor={Colors.color5}
                resizeMode="contain"
                style={{width: 50, height: 50}}
                source={require('../assets/Icons/rewind.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={isPlaying ? this.pauseAudio : this.playAudio}>
              <Image
                resizeMode="contain"
                tintColor={Colors.color5}
                source={
                  isPlaying
                    ? require('../assets/Icons/pause.png')
                    : require('../assets/Icons/play.png')
                }
                style={{
                  width: isPlaying ? 120 : 150,
                  height: isPlaying ? 120 : 150,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onForwardValueChange}>
              <Image
                tintColor={Colors.color5}
                resizeMode="contain"
                style={{width: 50, height: 50}}
                source={require('../assets/Icons/forward.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default AudioPlayer;
