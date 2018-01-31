import React, { Component } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions } from 'react-native';

let { height, width } = Dimensions.get('window');

export class SpinnerComponent extends Component {

  render() {
    return (
      <SpinnerContainer>
        <ActivityIndicator animating size='large'/>
      </SpinnerContainer>
    );
  };
}


const SpinnerContainer = styled.View`
            flex: 1;
            position: absolute;
            top: 0;
            left: 0;
            height: ${height};
            width: ${width};
            justifyContent: center;
            alignItems: center;
            backgroundColor: "rgba(255,255,255,0.6)";
            zIndex: 100;
`;

export default SpinnerComponent;