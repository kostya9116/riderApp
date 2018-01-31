import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/auth-module";
import SignInComponent from "../components/auth/SignInComponent";

const mapStateToProps = (store) => {
  return ({
    isLoading: store.common.isLoading,
    isLoggedIn: store.auth.isLoggedIn,
    signInMessage: store.auth.signInMessage,
    signInMessageType: store.auth.signInMessageType,
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInComponent);





