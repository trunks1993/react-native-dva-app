import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles from 'styles/index.css';

export interface FaceProps {
  user: any;
}

class Face extends React.Component<FaceProps> {
  render() {
    return (
      <ImageBackground source={require('assets/images/bg-page.png')} style={GlobalStyles.container}>
        
      </ImageBackground >
    )
  }
}

export default connect(({ home }: ConnectState) => {
  return {
    user: home.user,
  }
})(Face);
