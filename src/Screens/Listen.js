import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors, NavService} from '../config';
import getApi from '../redux/RequestTypes/get';
import {connect} from 'react-redux';

const RenderItems = ({arr, item, index}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavService.navigate('AudioPlayer', {item, arr, index});
      }}
      style={{
        marginBottom: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.dimGray,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 5,
          backgroundColor: Colors.color5 + 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.white, fontWeight: 600}}>{index + 1}</Text>
      </View>
      <View style={{flex: 1, padding: 10, paddingHorizontal: 15}}>
        <Text>{item?.name}</Text>
        <Text style={{color: Colors.dimGray, marginTop: 5}}>
          {item?.meaning}
        </Text>
      </View>
      <Image
        tintColor={Colors.color5}
        resizeMode="contain"
        style={{width: 50, height: 50}}
        source={require('../assets/Icons/play.png')}
      />
    </TouchableOpacity>
  );
};
const quranSurahs = [
  {name: 'Al-Fatihah', meaning: 'The Opening'},
  {name: 'Al-Baqarah', meaning: 'The Cow'},
  {name: 'Aal-E-Imran', meaning: 'The Family of Imran'},
  {name: 'An-Nisa', meaning: 'The Women'},
  {name: "Al-Ma'idah", meaning: 'The Table Spread'},
  {name: "Al-An'am", meaning: 'The Cattle'},
  {name: "Al-A'raf", meaning: 'The Heights'},
  {name: 'Al-Anfal', meaning: 'The Spoils of War'},
  {name: 'At-Tawbah', meaning: 'The Repentance'},
  {name: 'Yunus', meaning: 'Jonah'},
  {name: 'Hud', meaning: 'Hud'},
  {name: 'Yusuf', meaning: 'Joseph'},
  {name: "Ar-Ra'd", meaning: 'The Thunder'},
  {name: 'Ibrahim', meaning: 'Abraham'},
  {name: 'Al-Hijr', meaning: 'The Rocky Tract'},
  {name: 'An-Nahl', meaning: 'The Bee'},
  {name: 'Al-Isra', meaning: 'The Night Journey'},
  {name: 'Al-Kahf', meaning: 'The Cave'},
  {name: 'Maryam', meaning: 'Mary'},
  {name: 'Ta-Ha', meaning: 'Ta-Ha'},
  {name: 'Al-Anbiya', meaning: 'The Prophets'},
  {name: 'Al-Hajj', meaning: 'The Pilgrimage'},
  {name: "Al-Mu'minun", meaning: 'The Believers'},
  {name: 'An-Nur', meaning: 'The Light'},
  {name: 'Al-Furqan', meaning: 'The Criterion'},
  {name: "Ash-Shu'ara", meaning: 'The Poets'},
  {name: 'An-Naml', meaning: 'The Ant'},
  {name: 'Al-Qasas', meaning: 'The Stories'},
  {name: 'Al-Ankabut', meaning: 'The Spider'},
  {name: 'Ar-Rum', meaning: 'The Romans'},
  {name: 'Luqman', meaning: 'Luqman'},
  {name: 'As-Sajda', meaning: 'The Prostration'},
  {name: 'Al-Ahzab', meaning: 'The Combined Forces'},
  {name: 'Saba', meaning: 'Sheba'},
  {name: 'Fatir', meaning: 'Originator'},
  {name: 'Ya-Sin', meaning: 'Ya-Sin'},
  {name: 'As-Saffat', meaning: 'Those who set the Ranks'},
  {name: 'Sad', meaning: 'The Letter Sad'},
  {name: 'Az-Zumar', meaning: 'The Troops'},
  {name: 'Ghafir', meaning: 'The Forgiver'},
  {name: 'Fussilat', meaning: 'Explained in Detail'},
  {name: 'Ash-Shura', meaning: 'Consultation'},
  {name: 'Az-Zukhruf', meaning: 'The Gold Adornments'},
  {name: 'Ad-Dukhan', meaning: 'The Smoke'},
  {name: 'Al-Jathiya', meaning: 'The Crouching'},
  {name: 'Al-Ahqaf', meaning: 'The Wind-Curved Sandhills'},
  {name: 'Muhammad', meaning: 'Muhammad'},
  {name: 'Al-Fath', meaning: 'The Victory'},
  {name: 'Al-Hujurat', meaning: 'The Rooms'},
  {name: 'Qaf', meaning: 'The Letter Qaf'},
  {name: 'Adh-Dhariyat', meaning: 'The Winnowing Winds'},
  {name: 'At-Tur', meaning: 'The Mount'},
  {name: 'An-Najm', meaning: 'The Star'},
  {name: 'Al-Qamar', meaning: 'The Moon'},
  {name: 'Ar-Rahman', meaning: 'The Beneficent'},
  {name: "Al-Waqi'a", meaning: 'The Inevitable'},
  {name: 'Al-Hadid', meaning: 'The Iron'},
  {name: 'Al-Mujadila', meaning: 'The Pleading Woman'},
  {name: 'Al-Hashr', meaning: 'The Exile'},
  {name: 'Al-Mumtahina', meaning: 'She that is to be examined'},
  {name: 'As-Saff', meaning: 'The Ranks'},
  {name: "Al-Jumu'a", meaning: 'The Congregation'},
  {name: 'Al-Munafiqun', meaning: 'The Hypocrites'},
  {name: 'At-Taghabun', meaning: 'The Mutual Disillusion'},
  {name: 'At-Talaq', meaning: 'The Divorce'},
  {name: 'At-Tahrim', meaning: 'The Prohibition'},
  {name: 'Al-Mulk', meaning: 'The Sovereignty'},
  {name: 'Al-Qalam', meaning: 'The Pen'},
  {name: 'Al-Haaqqa', meaning: 'The Reality'},
  {name: "Al-Ma'arij", meaning: 'The Ascending Stairways'},
  {name: 'Nuh', meaning: 'Noah'},
  {name: 'Al-Jinn', meaning: 'The Jinn'},
  {name: 'Al-Muzzammil', meaning: 'The Enshrouded One'},
  {name: 'Al-Muddaththir', meaning: 'The Cloaked One'},
  {name: 'Al-Qiyama', meaning: 'The Resurrection'},
  {name: 'Al-Insan', meaning: 'Man'},
  {name: 'Al-Mursalat', meaning: 'The Emissaries'},
  {name: 'An-Naba', meaning: 'The Tidings'},
  {name: "An-Nazi'at", meaning: 'Those who drag forth'},
  {name: "'Abasa", meaning: 'He frowned'},
  {name: 'At-Takwir', meaning: 'The Overthrowing'},
  {name: 'Al-Infitar', meaning: 'The Cleaving'},
  {name: 'Al-Mutaffifin', meaning: 'Defrauding'},
  {name: 'Al-Inshiqaq', meaning: 'The Splitting Open'},
  {name: 'Al-Buruj', meaning: 'The Mansions of the Stars'},
  {name: 'At-Tariq', meaning: 'The Morning Star'},
  {name: 'Al-Ala', meaning: 'The Most High'},
  {name: 'Al-Ghashiya', meaning: 'The Overwhelming'},
  {name: 'Al-Fajr', meaning: 'The Dawn'},
  {name: 'Al-Balad', meaning: 'The City'},
  {name: 'Ash-Shams', meaning: 'The Sun'},
  {name: 'Al-Lail', meaning: 'The Night'},
  {name: 'Ad-Duhaa', meaning: 'The Morning Hours'},
  {name: 'Ash-Sharh', meaning: 'The Relief'},
  {name: 'At-Tin', meaning: 'The Fig'},
  {name: 'Al-Alaq', meaning: 'The Clot'},
  {name: 'Al-Qadr', meaning: 'The Power'},
  {name: 'Al-Bayyina', meaning: 'The Clear Proof'},
  {name: 'Az-Zalzala', meaning: 'The Earthquake'},
  {name: 'Al-Adiyat', meaning: 'The Courser'},
  {name: 'Al-Qaria', meaning: 'The Calamity'},
  {name: 'At-Takathur', meaning: 'The Rivalry in world increase'},
  {name: 'Al-Asr', meaning: 'The Declining Day'},
  {name: 'Al-Humaza', meaning: 'The Traducer'},
  {name: 'Al-Fil', meaning: 'The Elephant'},
  {name: 'Quraish', meaning: 'Quraish'},
  {name: "Al-Ma'un", meaning: 'Small Kindnesses'},
  {name: 'Al-Kawthar', meaning: 'Abundance'},
  {name: 'Al-Kafirun', meaning: 'The Disbelievers'},
  {name: 'An-Nasr', meaning: 'The Divine Support'},
  {name: 'Al-Masad', meaning: 'The Palm Fiber'},
  {name: 'Al-Ikhlas', meaning: 'The Sincerity'},
  {name: 'Al-Falaq', meaning: 'The Daybreak'},
  {name: 'An-Nas', meaning: 'Mankind'},
];

class Listen extends Component {
  state = {
    data: [],
    renderNumber: 10,
    isLoading: true,
  };
  getData = async () => {
    const data = await getApi(
      'https://api.quran.com/api/v4/chapter_recitations/4?language=en',
    );
    console.log('Audiodata', data.audio_files);
    this.setState({data: data.audio_files});
  };
  componentDidMount() {
    // this.getData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1.5,
            backgroundColor: Colors.color5,
            // justifyContent: 'space-between',
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
          <Text
            style={{
              color: Colors.white,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              flex: 1,
            }}>
            Surah
          </Text>
          <View style={{width: 30, height: 30}} />
        </View>
        <View style={{flex: 8}}>
          <FlatList
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
            // style={{backgroundColor: 'red'}}
            keyExtractor={(item, index) => index.toString()}
            data={quranSurahs}
            renderItem={({item, index}) => (
              <RenderItems
                arr={this.props.quranAudioData2}
                item={item}
                index={index}
              />
            )}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({reducer}) => {
  console.log('audio', reducer.quranAudioData2);
  return {
    quranAudioData2: reducer.quranAudioData2,
  };
};

export default connect(mapStateToProps)(Listen);
