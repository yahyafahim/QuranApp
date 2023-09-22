import React, {useState, useEffect, Component, PureComponent} from 'react';
import {
  View,
  Text,
  Button,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PDFView from 'react-native-pdf';
import {Colors, NavService} from '../config';
import {SavedLastPage} from '../redux/actions';
import {connect} from 'react-redux';

const QWT = props => {
  const [currentPage, setCurrentPage] = useState(props?.page);
  console.log('currentPage', currentPage, props.page);
  useEffect(() => {
    setCurrentPage(props.page);
  }, [props.startOver]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1.5,
          backgroundColor: Colors.color5,
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
          Quran
        </Text>
        <Text style={{color: Colors.white, fontSize: 18, fontWeight: '800'}}>
          {props.page}
        </Text>
      </View>
      <View style={{flex: 8.5}}>
        <View
          style={{
            flex: 1,
            borderColor: Colors.color5,
            borderWidth: 3,
            margin: 5,
          }}>
          <View
            style={{
              flex: 1,
              borderColor: Colors.color5,
              borderWidth: 2,
              margin: 5,
            }}>
            <PDFView
              key={props.startOver}
              page={currentPage}
              horizontal
              enablePaging
              style={{flex: 1, borderColor: 'red'}}
              source={
                Platform.OS === 'android'
                  ? {
                      uri: 'bundle-assets://path/to/quran_tajwid.pdf',
                      cache: true,
                    }
                  : require('../assets/pdf/quran_tajwid.pdf')
              }
              onError={error => console.log('PDF Error', error)}
              onPageChanged={page => {
                props.onPageChanged(page);
              }}
              onPageSingleTap={() => {}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
function mapDispatchToProps(dispatch) {
  return {
    savedPage: data => {
      dispatch({type: 'SAVED_LAST_PAGE', payload: data});
    },
  };
}
const mapStateToProps = ({reducer}) => {
  return {
    savedLastPage: reducer.savedLastPage,
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(QWT);
export default React.memo(QWT);
