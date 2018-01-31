import React, { Component } from "react";
import { AppRegistry } from 'react-native';
import {Provider} from "react-redux";
import { Root } from 'native-base';
import store from "./src/redux/store";
import "./src/setup";
import App from './src/App';

class RiderApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Root style={{ flex: 1 }}>
        <Provider store={store}>
          <App/>
        </Provider>
      </Root>
    );
  };
}

AppRegistry.registerComponent('RiderApp', () => RiderApp);
