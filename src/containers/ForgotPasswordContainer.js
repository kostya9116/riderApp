import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/auth-module";
import ForgotPasswordComponent from "../components/auth/ForgotPasswordComponent";

const mapStateToProps = (store) => {
  return ({
    isLoading: store.common.isLoading,
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordComponent);





