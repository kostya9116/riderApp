import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

let { height } = Dimensions.get('window');

export default class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.routeTo = this.routeTo.bind(this);
  }

  routeTo(key) {
    const { currentScene } = Actions;
    (key === currentScene) ? Actions.push(key) : Actions[key]({type: 'reset'});
  }

  render() {
    return (
      <ViewContainer>
        <Button onPress={() => this.routeTo('orderHistory')}><Text>HISTORY</Text></Button>
        <Button onPress={() => this.routeTo('upcomingDeliveries')}><Text>UPCOMING ORDERS</Text></Button>
        <Button onPress={() => this.props.actions.signOutUserAction()}><Text>SIGN OUT</Text></Button>
      </ViewContainer>
    );
  };
}

const ViewContainer = styled.View`
        alignItems: center;
        flexDirection: row;
        marginBottom: 20;
`;


const Button = styled.TouchableOpacity`
       backgroundColor: transparent;
       borderColor: #385D8A;
       borderWidth: 1;
       borderRadius: 10;
       width: 25%;
       marginHorizontal: 1%;
       paddingVertical: 10px;
       alignItems: center;
       justifyContent: center;
       flexDirection: row;
       
`;

const Text = styled.Text`
       color: rgba(255, 255, 255, 0.7); 
       textAlign: center;
`;
