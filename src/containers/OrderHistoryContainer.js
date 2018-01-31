import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/order-module";
import OrderHistory from "../components/OrderHistory";

const mapStateToProps = (store) => {
  return ({
    isLoading: store.common.isLoading,
    user: store.auth.user,
    pastDeliveries: store.order.pastDeliveries,
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);





