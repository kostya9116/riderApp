import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { List, ListItem, Content } from "native-base";
import SpinnerComponent from './common/SpinnerComponent';
import Footer from "../containers/FooterContainer";

let { width, height } = Dimensions.get('window');

export default class OrderHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pastDeliveries: [],
      isLoading: false,
    };
    this.renderOrders = this.renderOrders.bind(this);
  }

  componentDidMount() {
    const { id } = !!this.props.user ? this.props.user : { id: '' };
    const { isLoading } = this.props;
    this.props.actions.getOrderHistoryAction();
    this.setState({ isLoading, id });
  }

  componentWillReceiveProps(nextProps) {
    const { isLoading } = nextProps;
    const pastDeliveries = nextProps.pastDeliveries ? nextProps.pastDeliveries : [];
    this.setState({ isLoading, pastDeliveries });
  }

  renderOrders(order) {
    return (
      <OrderContainer>
        <InformationRow>
          <InformationLabelContainer>
            <Text primary underline>Order ID:</Text>
          </InformationLabelContainer>
          <InformationContentContainer>
            <Text primary>{order.order_id}</Text>
          </InformationContentContainer>
        </InformationRow>
        <InformationRow>
          <InformationLabelContainer>
            <Text primary underline>Restaurant Address:</Text>
          </InformationLabelContainer>
          <InformationContentContainer>
            <Text primary>{order.pickup_address}</Text>
          </InformationContentContainer>
        </InformationRow>
        <InformationRow>
          <InformationLabelContainer>
            <Text primary underline>Customer Address:</Text>
          </InformationLabelContainer>
          <InformationContentContainer>
            <Text primary>{order.destination_address}</Text>
          </InformationContentContainer>
        </InformationRow>
        <InformationRow>
          <InformationLabelContainer>
            <Text primary underline>Docket:</Text>
          </InformationLabelContainer>
          <InformationContentContainer>
            <Text primary>{order.fee}</Text>
          </InformationContentContainer>
        </InformationRow>

      </OrderContainer>
    )
  }

  render() {
    const { isLoading, pastDeliveries } = this.state;
    return (
      <KeyboardAvoidingView>
        <ViewContainer>
          <ScrollView>
            <Content
              contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
              {!!pastDeliveries.length &&
              < List dataArray={pastDeliveries} renderRow={(order) => this.renderOrders(order)}/>
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
        justifyContent: center;
        minHeight: ${height - 50};
`;


const OrderContainer = styled.View`
        marginTop: 35;
        paddingLeft: 50;
        width: 100%;
        flexDirection: column;
        borderColor: #385D8A;
        borderWidth: 1;
        borderRadius: 10;
        justifyContent: center;
        paddingVertical: 10px;
`;

const InformationRow = styled.View`
      width: 100%;
      flexDirection: row;
`;

const InformationLabelContainer = styled.View`
     width: 150px;

`;

const InformationContentContainer = styled.View`
        width: ${width - 220};
`;

const Text = styled.Text`
       color: ${props => props.primary ? 'rgba(255, 255, 255, 0.7)' : '#304250'}; 
       textDecorationLine: ${props => props.underline ? 'underline' : 'none'}; 
       textDecorationColor: ${props => props.underline ? '#304250' : 'transparent'}; 
       lineHeight: 25;
`;
