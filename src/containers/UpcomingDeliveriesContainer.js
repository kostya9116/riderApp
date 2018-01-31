import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from "../modules/order-module";
import UpcomingDeliveries from "../components/UpcomingDeliveries";

const mapStateToProps = (store) => {
  return ({
    isLoading: store.common.isLoading,
    user: store.auth.user,
    upcomingDeliveries: store.order.upcomingDeliveries,
  });
};

// mapDispatchToProps :: Dispatch -> {Action}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingDeliveries);





