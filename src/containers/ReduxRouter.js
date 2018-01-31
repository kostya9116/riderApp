import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Actions, Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';
// other imports...


class Routes extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.reducerCreate = ::this.reducerCreate;
  }

  reducerCreate(params) {
    const defaultReducer = Reducer(params);
    return (state, action) => {
      this.props.dispatch(action)
      return defaultReducer(state, action);
    };
  }

  render () {
    return (
      <Router
        createReducer={this.reducerCreate}>
        { this.props.children }
      </Router>
    );
  }
}

export default connect()(Routes);