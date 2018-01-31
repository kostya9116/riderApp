import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/order-module";
import OrderDetails from "../components/OrderDetails";

const mapStateToProps = (store) => {
  return ({
    isLoading: store.common.isLoading,
    user: store.auth.user,
    order: store.order.selectedOrder,
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetails);





