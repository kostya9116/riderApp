import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/auth-module";
import Footer from "../components/Footer";

const mapStateToProps = (store) => {
  return ({
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);





