import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import QWT from './QWT';
import {connect} from 'react-redux';
import CustomButton from '../components/CustomButton';

export class PdfViewer extends Component {
  state = {
    curentPage: 1,
  };
  render() {
    return (
      <View style={{flex: 1, marginBottom: 20}}>
        <QWT
          page={this.props.savedLastPage}
          onPageChanged={page => {
            // this.setState({curentPage: page});
            this.props.savedPage(page);
          }}
          savedPage={this.props.savedPage}
          startOver={this.props.startOver}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomButton
            onPress={() => {
              this.props.savedPage(1);
              this.props.StartOver(this.props.startOver + 1);
            }}
            title="Start Over"
            buttonStyle={{marginHorizontal: 20, width: '80%'}}
          />
        </View>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    savedPage: data => {
      dispatch({type: 'SAVED_LAST_PAGE', payload: data});
    },
    StartOver: data => {
      dispatch({type: 'START_OVER', payload: data});
    },
  };
}
const mapStateToProps = ({reducer}) => {
  console.log('reducer', reducer.startOver);
  return {
    savedLastPage: reducer.savedLastPage,
    startOver: reducer.startOverPge,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PdfViewer);
