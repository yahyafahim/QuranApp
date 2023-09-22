import React from 'react';
import {View, TextInput, Image} from 'react-native';
import Icons from '../assets/Icons';
import {Colors, Shadows} from '../config';

const Search = ({onChangeText = () => {}}) => {
  const [search, setSearch] = React.useState('');
  return (
    <View
      style={{
        backgroundColor: Colors.background,
        height: 50,
        marginTop: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5,
        ...Shadows.shadow3,
      }}>
      <TextInput
        onChangeText={text => {
          setSearch(text);
          onChangeText(text);
        }}
        returnKeyType="search"
        placeholder={'Search...'}
        value={search}
        placeholderTextColor={Colors.grey}
        style={{
          flex: 1,
          color: Colors.secondary,
          fontSize: 16,
        }}
        maxLength={20}
      />
      <Image
        source={Icons.search}
        style={{height: 20, width: 20, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Search;
