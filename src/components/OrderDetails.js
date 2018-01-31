import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List, ListItem, Content } from "native-base";
import SpinnerComponent from './common/SpinnerComponent';
import Footer from "../containers/FooterContainer";

let { width, height } = Dimensions.get('window');

export default class OrderDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      riderID: '',
      order: {},
      isLoading: false,
      buttonName: ''
    };
    this.updateData = this.updateData.bind(this);
    this.updateButtonName = this.updateButtonName.bind(this);
    this.changeOrderStatus = this.changeOrderStatus.bind(this);
  }

  componentDidMount() {
    this.updateData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }

  updateData(data) {
    const { id } = !!data.user ? data.user : { id: '' };
    const { isLoading, order } = data;
    console.log("ORDER", order);
    const buttonName = this.updateButtonName(order.status);
    this.setState({ isLoading, order, riderID: id, buttonName });
  }

  updateButtonName(status) {
    let buttonName = '';
    if ( status === 'RIDER_ASSIGNED' ) {
      buttonName = 'COLLECTED'
    } else if ( status === 'PICKED_UP' ) {
      buttonName = 'DELIVERED'
    }
    return buttonName;
  }

  changeOrderStatus() {
    let actionName = '';
    const { buttonName, order, riderID } = this.state;
    const { id } = order;
    const data = { delivery: { id, rider_id: riderID } }
    if ( buttonName === 'COLLECTED' ) {
      actionName = 'pickUpOrderAction'
    } else if ( buttonName === 'DELIVERED' ) {
      actionName = 'deliverOrderAction'
    }
    this.props.actions[ actionName ](data);
  }

  render() {
    const { isLoading, order, buttonName } = this.state;
    const isData = !!order && !!Object.values(order).length;
    const delivered = order.status === 'DELIVERED';
    return (
      <KeyboardAvoidingView>
        <ViewContainer>
          <ScrollView>
            {isData &&
            <OrderContainer>
              <InformationRow>
                <InformationLabelContainer>
                  <Text underline>Customer Address:</Text>
                </InformationLabelContainer>
                <InformationContentContainer>
                  <Text>{order.destination_address}</Text>
                </InformationContentContainer>
              </InformationRow>
              <InformationRow>
                <InformationLabelContainer>
                  <Text underline>Restaurant Address:</Text>
                </InformationLabelContainer>
                <InformationContentContainer>
                  <Text>{order.pickup_address}</Text>
                </InformationContentContainer>
              </InformationRow>
              <InformationRow>
                <InformationLabelContainer>
                  <Text underline>Order ID:</Text>
                </InformationLabelContainer>
                <InformationContentContainer>
                  <Text>{order.order_id}</Text>
                </InformationContentContainer>
              </InformationRow>
              <InformationRow>
                <InformationLabelContainer>
                  <Text underline>Docket:</Text>
                </InformationLabelContainer>
                <InformationContentContainer>
                  <Text>{order.fee}</Text>
                </InformationContentContainer>
              </InformationRow>
              <StatusButtonContainer>
                {!delivered &&
                <Button
                  onPress={() => this.changeOrderStatus()}><StatusButtonText>{buttonName}</StatusButtonText></Button>
                }
                {!!delivered &&
                <StatusContainer>
                  <Icon name="check" style={{ backgroundColor: 'transparent' }} size={30} color="green"/>
                  <Text>DELIVERED</Text>
                </StatusContainer>
                }
              </StatusButtonContainer>
            </OrderContainer>
            }
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


const OrderContainer = styled.View`
        marginTop: 35;
        paddingHorizontal: 50;
        width: 100%;
        flexDirection: column;
        justifyContent: center;
        paddingVertical: 10px;
`;

const StatusContainer = styled.View`
      width: 100%;
      flexDirection: row;
      justifyContent: center;
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

const StatusButtonContainer = styled.View`
        marginTop: 35;
        width: 100%;
        alignItems: center;
        justifyContent: center;
`;

const Button = styled.TouchableOpacity`
       backgroundColor: transparent;
       borderColor: #385D8A;
       borderWidth: 1;
       borderRadius: 10;
       width: 50%;
       marginHorizontal: 1%;
       paddingVertical: 10px;
       alignItems: center;
       justifyContent: center;
       flexDirection: row;
       
`;

const Text = styled.Text`
       color: rgba(255, 255, 255, 0.7); 
       textDecorationLine: ${props => props.underline ? 'underline' : 'none'}; 
       textDecorationColor: ${props => props.underline ? 'rgba(255, 255, 255, 0.7)' : 'transparent'}; 
       lineHeight: ${props => props.underline ? '19' : '17'}; 
       marginVertical: 5;
       lineHeight: 20; 
`;

const StatusButtonText = styled.Text`
       color: rgba(255, 255, 255, 0.7); 
       marginVertical: 5;
       lineHeight: 20; 
       fontWeight: bold;
`;
