import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SpinnerComponent from './common/SpinnerComponent';

let { height } = Dimensions.get('window');

export default class SignInComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if ( !!this.props.isLoggedIn ) {
      Actions.upcomingDeliveries({ type: 'replace' });
    } else {
      this.props.actions.trialSignInAction();
    }
  }

  render() {
    return (
      <InitialViewContainer>
        <LogoImageContainer>
          <LogoImage source={require('../../assets/img/no-photo.png')}/>
        </LogoImageContainer>
        <SpinnerComponent/>
      </InitialViewContainer>
    );
  };
}

const InitialViewContainer = styled.KeyboardAvoidingView`
        flex: 1;
        backgroundColor: #4F81BD;
        alignItems: center;
        minHeight: ${height};
`;


const LogoImageContainer = styled.View`
       flex: 1;
       alignItems: center;
       justifyContent: center;
`;

const LogoImage = styled.Image`
        width: 150;
        height: 150;
`;
