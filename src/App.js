import React, { Component } from 'react';
import SignInComponent from "./containers/SignInContainer";
import ForgotPasswordComponent from "./containers/ForgotPasswordContainer";
import UpcomingDeliveries from "./containers/UpcomingDeliveriesContainer";
import OrderHistory from "./containers/OrderHistoryContainer";
import OrderDetails from "./containers/OrderDetailsContainer";
import InitialComponent from "./containers/InitialContainer";
import { Scene } from "react-native-router-flux";
import ReduxRouter from "./containers/ReduxRouter";
import { Container } from 'native-base';

export default class App extends Component<{}> {
  render() {
    return (
      <Container style={{ flex: 1 }}>
        <ReduxRouter style={{ minHeight: 100 }}>
          <Scene key="root"
                 hideNavBar
          >
            <Scene key="initialComponent"
                   component={InitialComponent}
                   hideNavBar
                   initial={true}
            />
            <Scene key="signIn"
                   component={SignInComponent}
                   hideNavBar
                   initial={false}
            />
            <Scene key="forgotPassword"
                   component={ForgotPasswordComponent}
                   hideNavBar={false}
                   title="Reset Password"
                   titleStyle={{ alignSelf: 'center', marginRight: 50, color: '#304250', fontWeight: 'bold' }}
                   initial={false}
            />
            <Scene key="upcomingDeliveries"
                   component={UpcomingDeliveries}
                   hideNavBar
                   initial={false}
            />
            <Scene key="orderHistory"
                   component={OrderHistory}
                   hideNavBar
                   initial={false}
            />
            <Scene key="orderDetails"
                   component={OrderDetails}
                   hideNavBar
                   initial={false}
            />
          </Scene>
        </ReduxRouter>
      </Container>
    );
  }
}


