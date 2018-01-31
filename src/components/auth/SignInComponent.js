import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpinnerComponent from '../common/SpinnerComponent';

let { height } = Dimensions.get('window');

export default class SignInComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'rider@example.com',
      password: 'secret',
      errorMessage: '',
      isLoading: false,
    };
    this.signIn = this.signIn.bind(this);
    this.validation = this.validation.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    const { isLoading, signInMessage, isLoggedIn } = nextProps;
    !isLoggedIn && this.setState({ isLoading, errorMessage: signInMessage });
  }

  validation() {
    let errorMessage = '';
    const { email, password } = this.state;
    const pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !email || !password ) {
      errorMessage = 'Please fill in required fields';
    } else if ( !pattern.test(email) ) {
      errorMessage = 'Please fill valid email address';
    }
    this.setState({ errorMessage });
    !errorMessage && this.signIn();
  }

  signIn() {
    const { email, password } = this.state;
    const userData = { rider: { email, password } };
    this.props.actions.signInUserAction(userData);
  }

  render() {
    const { isLoading, errorMessage, email, password } = this.state;
    return (
      <KeyboardAvoidingView>
        <ScrollView>
          <SignInViewContainer>
            <LogoImageContainer>
              <LogoImage source={require('../../../assets/img/no-photo.png')}/>
            </LogoImageContainer>
            <InputFieldsContainer>
              <InputContainer>
                <Input underlineColorAndroid="transparent"
                       keyboardType='email-address'
                       placeholderTextColor="rgba(255, 255, 255, 0.7)"
                       placeholder="Email"
                       autoCapitalize="none"
                       value={email}
                       onChangeText={val => this.setState({ email: val })}
                />
                {!!errorMessage &&
                <Icon name="exclamation-triangle" style={{ backgroundColor: 'transparent' }} size={15} color="#900"/>
                }
              </InputContainer>

              <InputContainer>
                <Input underlineColorAndroid="transparent"
                       placeholderTextColor="rgba(255, 255, 255, 0.7)"
                       placeholder="Password"
                       secureTextEntry
                       value={password}
                       onChangeText={val => this.setState({ password: val })}
                />
                {!!errorMessage &&
                <Icon name="exclamation-triangle" style={{ backgroundColor: 'transparent' }} size={15} color="#900"/>
                }
              </InputContainer>
            </InputFieldsContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SignInButtonContainer>
              <Button primary onPress={this.validation}>
                <Text primary>Sign In</Text>
              </Button>
            </SignInButtonContainer>
            <ForgotPasswordContainer>
              <TextButton onPress={() => Actions.forgotPassword({})}>
                <Text primary>Forgot Password</Text>
              </TextButton>
            </ForgotPasswordContainer>
          </SignInViewContainer>
          {isLoading &&
          <SpinnerComponent/>
          }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
}

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
        flex: 1;
        backgroundColor: #4F81BD;
`;

const ScrollView = styled.ScrollView`
        flex: 1;
`;

const SignInViewContainer = styled.View`
        flex: 1;
        alignItems: center;
        minHeight: ${height};
`;

const LogoImageContainer = styled.View`
       height: 200;
       alignItems: center;
       justifyContent: center;
`;

const LogoImage = styled.Image`
        width: 150;
        height: 150;
`;

const InputFieldsContainer = styled.View`
        paddingHorizontal: 50;
        width: 100%;
`;

const InputContainer = styled.View`
        borderBottomColor: rgba(255, 255, 255, 0.7);
        borderBottomWidth: 1;
        flexDirection: row;
        justifyContent: space-between;
        alignItems: center;
        marginBottom: 15;

`;

const Input = styled.TextInput`
        color: rgba(255, 255, 255, 0.7);
        flex: 1;
`;

const SignInButtonContainer = styled.View`
        marginTop: 35;
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
       flexDirection: row;
       
`;

const ForgotPasswordContainer = styled.View`
        marginTop: 5;
        paddingHorizontal: 50;
        width: 100%;  
        flexDirection: row;
        justifyContent: flex-end;
        background-color: transparent;
`;

const TextButton = styled.TouchableOpacity`
       background-color: transparent;
       alignItems: center;
       justifyContent: center;
       marginLeft: 5;
       borderBottomColor: rgba(255, 255, 255, 0.7);
       borderBottomWidth: 1;
`;

const Text = styled.Text`
       color: ${props => props.primary ? 'rgba(255, 255, 255, 0.7)' : '#304250'}; 
`;

const ErrorMessage = styled.Text`
       color: #900;
       backgroundColor: transparent
`;