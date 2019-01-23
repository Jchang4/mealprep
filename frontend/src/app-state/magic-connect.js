// @flow
import * as R from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export default ({
  selectors,
  actions
}: {
  selectors: Object,
  actions: Object
}) => {
  const mapStateToProps = selectors => (state, props) =>
    R.map(selector => selector(state, props), selectors);
  const mapDispatchToProps = actions => dispatch =>
    bindActionCreators(actions, dispatch);

  return Component =>
    connect(
      selectors ? mapStateToProps(selectors) : null,
      actions ? mapDispatchToProps(actions) : null
    )(Component);
};
