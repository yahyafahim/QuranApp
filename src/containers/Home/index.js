import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
// import Swiper from 'react-native-swiper';
import AppBackground from '../../components/AppBackground';
import Categories from '../../components/Categories';
import {Colors, Fonts, NavService} from '../../config';
import {getSlides, getRooms, getVideos} from '../../redux/APIs';
import Text from '../../components/TextTranslator';
import Icons from '../../assets/Icons';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

export class Home extends Component {
  state = {
    slides: [],
    liveRoom: [],
    videos: [],
    selectedCategory: -1,
  };

  async componentDidMount() {
    setTimeout(() => {
      // NavService.navigate('Quiz');
    }, 100);
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      const slides = await getSlides();
      const videos = await getVideos();
      const liveRoom = await getRooms();
      console.log('liveRoom', liveRoom);
      console.log('videos', videos);
      this.setState({slides, liveRoom, videos});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  listHeader = () => {
    const {slides, liveRoom, selectedCategory} = this.state;
    const {user} = this.props;
    let filteredLiveRoom = liveRoom;
    if (selectedCategory !== -1) {
      filteredLiveRoom = liveRoom.filter(item =>
        item.room.cat_id.includes(selectedCategory),
      );
    }
    return (
      <>
        <Categories onChange={id => this.setState({selectedCategory: id})} />
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.boldItalic,
              fontSize: 24,
            }}>
            str_DailyMeditations
          </Text>

          <View
            style={{
              height: 200,
              marginTop: 20,
              borderRadius: 24,
            }}>
            {/* <Swiper
              bounces={false}
              height={200}
              width={width}
              loop={false}
              dotStyle={{
                width: 5,
                backgroundColor: Colors.dimGray,
                height: 5,
              }}
              activeDotStyle={{
                height: 5,
                width: 15,
                backgroundColor: Colors.selectiveYellow,
              }}>
              {slides.map((item, i) => {
                return (
                  <Image
                    key={i}
                    source={{uri: item?.banner}}
                    style={{
                      resizeMode: 'cover',
                      width: width - 46,
                      height: 150,
                      borderRadius: 18,
                    }}
                  />
                );
              })}
            </Swiper> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.boldItalic,
              fontSize: 24,
            }}>
            str_LiveRoom
          </Text>
          {user?.user_type === 'coach' && (
            <TouchableOpacity
              onPress={() => NavService.navigate('RegisterRoom')}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  tintColor: Colors.black,
                }}
                source={Icons.add}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: '100%',
            paddingBottom: 20,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {filteredLiveRoom?.length > 0 ? (
            filteredLiveRoom.map((item, i) => {
              return <RoomList key={i} item={item.room} />;
            })
          ) : (
            <Text
              style={{
                color: Colors.black,
                fontFamily: Fonts.medium,
                fontSize: 20,
                textAlign: 'center',
                marginTop: 10,
                width: '100%',
              }}>
              No live room available
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.boldItalic,
              fontSize: 24,
            }}>
            str_Video
          </Text>
          {/* <TouchableOpacity>
            <Image
              style={{
                height: 15,
                width: 15,
                tintColor: Colors.black,
              }}
              source={Icons.add}
            />
          </TouchableOpacity> */}
        </View>
      </>
    );
  };

  render() {
    const {videos, selectedCategory} = this.state;
    let filteredVideos = videos;
    if (selectedCategory !== -1) {
      filteredVideos = videos.filter(
        item => item.category_id == selectedCategory,
      );
    }

    return (
      <AppBackground>
        <FlatList
          data={filteredVideos}
          ListHeaderComponent={this.listHeader}
          style={{paddingHorizontal: 3}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          renderItem={props => <VideoList {...props} />}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: Colors.black,
                fontFamily: Fonts.medium,
                fontSize: 20,
                textAlign: 'center',
                marginTop: 10,
              }}>
              No videos available
            </Text>
          )}
        />
      </AppBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.reducer.user,
  };
}

export default connect(mapStateToProps)(Home);

const RoomList = ({item}) => {
  const {banner, name, status, id} = item;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => NavService.navigate('RoomDetails', {id})}
      style={{
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginTop: 15,
        width: width / 2 - 30,
        ...Shadows.shadow3,
      }}>
      <Image
        source={{uri: banner}}
        style={{
          width: '100%',
          height: 75,
          resizeMode: 'cover',
          backgroundColor: Colors.lavenderGray,
          borderRadius: 8,
        }}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          style={{
            color: Colors.black,
            fontFamily: Fonts.boldItalic,
            fontSize: 18,
            marginTop: 10,
          }}>
          {name}
        </Text>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          {/* <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.italic,
              fontSize: 16,
            }}>
            {lang}
          </Text>
          <View
            style={{
              marginHorizontal: 10,
              height: 16,
              width: 2,
              backgroundColor: Colors.black,
            }}
          /> */}
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              backgroundColor:
                status == 'online' ? 'green' : Colors.lavenderGray,
            }}
          />
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.italic,
              fontSize: 18,
              marginLeft: 5,
            }}>
            {status == 'online' ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const VideoList = ({item}) => {
  const {banner, name, lang, minute} = item;
  console.log(item);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => NavService.navigate('VideoPlayer', {content: item})}
      style={{
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginTop: 15,
        width: width / 2 - 30,
        ...Shadows.shadow3,
      }}>
      <Image
        source={{uri: banner}}
        style={{
          width: '100%',
          height: 75,
          resizeMode: 'cover',
          backgroundColor: Colors.lavenderGray,
          borderRadius: 8,
        }}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          style={{
            color: Colors.black,
            fontFamily: Fonts.boldItalic,
            fontSize: 18,
            marginTop: 10,
          }}>
          {name}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.italic,
              fontSize: 16,
            }}>
            {lang}
          </Text>
          <View
            style={{
              marginHorizontal: 10,
              height: 16,
              width: 2,
              backgroundColor: Colors.black,
            }}
          />
          <Image
            source={Icons.clock}
            style={{width: 14, height: 14, resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.italic,
              fontSize: 16,
              marginLeft: 5,
            }}>
            {minute} mins
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
