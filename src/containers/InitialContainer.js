import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/auth-module";
import InitialComponent from "../components/InitialComponent";

const mapStateToProps = (store) => {
  return ({
    isLoading: store.common.isLoading,
    isLoggedIn: store.auth.isLoggedIn,
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialComponent);





