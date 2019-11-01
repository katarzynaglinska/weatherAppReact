import React from "react";
import "../App.scss";

class Tab extends React.Component {
  render() {
    return (
      <div className={"tab-panel" + (this.props.active ? " active" : "")}>
        {this.props.children}
      </div>
    );
  }
}

Tab.defaultProps = {
  active: false
};

export default Tab;
