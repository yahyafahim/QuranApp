<ActionSheet
  containerStyle={{
    height: 200,
  }}
  closeAnimationConfig={{
    duration: 1500,
  }}
  onClose={() => {
    setisLongPress(false);
    setisPress(false);
    setTValue('');
    SoundPlayer.stop();
    setisPlaying(false);
  }}
  indicatorStyle={{
    backgroundColor: Colors.color5,
  }}
  indicatorColor={Colors.color5}
  bounceOnOpen={true}
  bounciness={8}
  gestureEnabled={true}
  ref={actionSheetRef}>
  {isPress ? (
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
      {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <CustomButton
        buttonStyle={{
          width: '80%',
        }}
        title="Close"
        onPress={() => {
          actionSheetRef.current?.hide();
          setisPress(false);
        }}
      />
    </View> */}
    </View>
  ) : null}
  {isLongPress ? (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 290,
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
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '800',
                textAlign: 'center',
              }}>
              {verse}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  ) : null}
</ActionSheet>;
