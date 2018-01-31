import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpinnerComponent from '../common/SpinnerComponent';

let { height } = Dimensions.get('window');

export default class ForgotPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMessage: '',
      isLoading: false,
    };
  }

  render() {
    const { email, errorMessage, isLoading } = this.state;
    return (
      <ForgotPasswordViewContainer>
        <MessagesContainer>
          <Message>Enter the email address you used to sign up.</Message>
          <Message>We'll send you instructions on how to reset your password.</Message>
        </MessagesContainer>
        <InputContainer>
          <Input underlineColorAndroid="transparent"
                 placeholderTextColor="rgba(255, 255, 255, 0.7)"
                 placeholder="E-mail"
                 keyboardType='email-address'
                 value={email}
                 onChangeText={val => this.setState({ email: val })}
          />
          {!!errorMessage &&
          <Icon name="exclamation-triangle" size={15} color="#900"/>
          }
        </InputContainer>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <SubmitButtonContainer>
          <Button primary>
            <Text>SUBMIT</Text>
          </Button>
        </SubmitButtonContainer>
        {isLoading &&
        <SpinnerComponent/>
        }
      </ForgotPasswordViewContainer>
    )
  }
}


const ForgotPasswordViewContainer = styled.View`
        background-color: #4F81BD;
        flex: 1;
        alignItems: center;
        justifyContent: center;
        minHeight: ${height};
`;

const MessagesContainer = styled.View`
        background-color: transparent;
        alignItems: center;
        justifyContent: center;
        padding: 10px;
`;

const Message = styled.Text`
       color: rgba(255, 255, 255, 0.7);
       font-size: 20; 
       textAlign: center;
       marginTop: 10;
`;
const Text = styled.Text`
       color: rgba(255, 255, 255, 0.7);
`;
const SubmitButtonContainer = styled.View`
        marginTop: 50;
        paddingHorizontal: 50;
        width: 100%;
`;

const Button = styled.TouchableOpacity`
       background-color: ${props => props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.7)'};
       borderColor: rgba(255, 255, 255, 0.7);
       borderWidth: 1;
       borderRadius: 10;
       width: 100%;
       paddingVertical: 10px;
       alignItems: center;
       justifyContent: center;
       
`;

const InputContainer = styled.View`
        borderBottomColor: rgba(255, 255, 255, 0.7);
        borderBottomWidth: 1;
        flexDirection: row;
        justifyContent: space-between;
        alignItems: center;
        marginTop: 20;
        marginHorizontal: 50;

`;

const Input = styled.TextInput`
        color: rgba(255, 255, 255, 0.7);
        flex: 1;
`;
const ErrorMessage = styled.Text`
       color: #900;
`;
