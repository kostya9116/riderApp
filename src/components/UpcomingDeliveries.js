import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { List, ListItem, Content } from "native-base";
import SpinnerComponent from './common/SpinnerComponent';
import Footer from "../containers/FooterContainer";

let { height } = Dimensions.get('window');

export default class UpcomingDeliveries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      id: '',
      upcomingDeliveries: [],
      isLoading: false,
    };
    this.renderOrders = this.renderOrders.bind(this);
    this.onOrderClick = this.onOrderClick.bind(this);
  }

  componentDidMount() {
    const { fullname, id } = !!this.props.user ? this.props.user : { fullname: '', id: '' };
    const { isLoading } = this.props;
    this.props.actions.getUpcomingDeliveriesAction(id);
    this.setState({ isLoading, fullname, id });
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;
    const upcomingDeliveries = nextProps.upcomingDeliveries ? nextProps.upcomingDeliveries : [];
    this.setState({ isLoading, upcomingDeliveries });
  }

  onOrderClick(data) {
    this.props.actions.selectOrderAction(data);
  }

  renderOrders(order) {
    return (
      <OrderButtonContainer>
        <Button primary onPress={() => this.onOrderClick(order)}>
          <Text primary>ORDER ID - {order.order_id}</Text>
        </Button>
      </OrderButtonContainer>
    )
  }

  render() {
    const { isLoading, fullname, upcomingDeliveries } = this.state;
    return (
      <KeyboardAvoidingView>
        <ViewContainer>
          <HeaderText>HI {fullname}</HeaderText>
          <ScrollView>
            <Content
              contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
              {!!upcomingDeliveries.length &&
              < List dataArray={upcomingDeliveries} renderRow={(order) => this.renderOrders(order)}/>
              }
              {!upcomingDeliveries.length &&
              <Text primary>There is no orders to show!</Text>
              }
            </Content>
          </ScrollView>

          <Footer/>
        </ViewContainer>
        {isLoading &&
        <SpinnerComponent/>
        }
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

const ViewContainer = styled.View`
        flex: 1;
        alignItems: center;
        minHeight: ${height - 50};
`;


const OrderButtonContainer = styled.TouchableOpacity`
        marginTop: 35;
        paddingHorizontal: 50;
        width: 100%;
`;

const Button = styled.TouchableOpacity`
       background-color: ${props => props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.7)'};
       borderColor: #385D8A;
       borderWidth: 1;
       borderRadius: 10;
       width: 100%;
       paddingVertical: 10px;
       alignItems: center;
       justifyContent: center;
       flexDirection: row;
       
`;

const HeaderText = styled.Text`
       color: ${props => props.primary ? 'rgba(255, 255, 255, 0.7)' : '#304250'}; 
       fontSize: 20px;
       marginTop: 20;
`;

const Text = styled.Text`
       color: ${props => props.primary ? 'rgba(255, 255, 255, 0.7)' : '#304250'}; 
`;
