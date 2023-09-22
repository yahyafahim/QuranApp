import React, {Component} from 'react';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {NavService} from './config';
import {connect} from 'react-redux';

//Screens
import {AuthStack, AppStack} from './containers';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Stack = createNativeStackNavigator();

class Navigation extends Component {
  state = {
    ready: false,
    initialRouteName: 'AuthStack',
  };
  getQuranData = async () => {
    fetch('https://api.alquran.cloud/v1/quran/quran-uthmani')
      .then(response => response.json())
      .then(data => {
        this.props.QuranData(data.data.surahs);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
      });
  };
  getAudioData = () => {
    fetch('https://api.alquran.cloud/v1/quran/ar.alafasy')
      .then(response => response.json())
      .then(data => {
        this.props.QuranAudioData(data.data.surahs);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
      });
  };
  getAudioData2 = () => {
    fetch('https://api.quran.com/api/v4/chapter_recitations/4?language=en')
      .then(response => response.json())
      .then(data => {
        this.props.QuranAudioData2(data.audio_files);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
      });
  };
  getTranslationData = () => {
    fetch('https://api.alquran.cloud/v1/quran/ur.asad')
      .then(response => response.json())
      .then(data => {
        console.log('data111', data);
        this.props.QuranTranslationData(data.data.surahs);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
      });
    // console.log('Audiodata', data.data.surahs[0].ayahs);
    // this.setState({data: data.data.surahs});
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      console.log('this.props.user', this.props.user);
      if (this.props.user) {
        this.getQuranData();
        this.getAudioData();
        this.getAudioData2();
        this.getTranslationData();
      }
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.getQuranData();
      this.getAudioData();
      this.getAudioData2();
      this.getTranslationData();
    }

    // setTimeout(() => {
    //   const {user} = this.props;
    //   if (user) {
    //     this.setState({initialRouteName: 'AppStack'});
    //   }
    //   this.setState({ready: true});
    // }, 2000);
  }

  render() {
    const {initialRouteName, ready} = this.state;
    // if (!ready) return null;
    return (
      <NavigationContainer
        ref={ref => NavService.setTopLevelNavigator(ref)}
        screenOptions={{animation: 'simple_push'}}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: 'transparent'},
            animation: 'simple_push',
          }}
          initialRouteName={'AppStack'}>
          {/* <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps({reducer: {user}}) {
  return {
    user,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    QuranData: data => {
      dispatch({type: 'SAVE_QURAN_DATA', payload: data});
    },
    QuranAudioData: data => {
      dispatch({type: 'SAVE_QURAN_AUDIO_DATA', payload: data});
    },
    QuranAudioData2: data => {
      dispatch({type: 'SAVE_QURAN_AUDIO_DATA2', payload: data});
    },
    QuranTranslationData: data => {
      dispatch({type: 'SAVE_TRANSLATION_DATA', payload: data});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
