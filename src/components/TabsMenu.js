import React from "react";
import "../App.scss";

class TabsMenu extends React.Component {
  state = {
    activeIndex: 0
  };

  handleOnClickMenu(key, event) {
    let name = this.props.children[key].props.name;
    let tab = this.props.children[key];
    event.preventDefault();
    this.setState({
      activeIndex: key
    });
    tab.props.changeMenu(key, name);
  }

  handleOnClickCategory(key, event) {
    let tabTitle = this.props.tabTitle;
    let tab = this.props.children[key];
    event.preventDefault();
    this.setState({
      activeIndex: key
    });

    tab.props.changeChartData(key, tabTitle);
  }

  renderNavItemMenu(key) {
    let tab = this.props.children[key];
    return (
      <div
        key={key}
        className={
          this.state.activeIndex == key
            ? " manu__item manu__item--selected active"
            : "manu__item"
        }
        onClick={this.handleOnClickMenu.bind(this, key)}
      >
        <span href="#">{tab.props.title}</span>
      </div>
    );
  }

  renderNavItemCategoryHistory(key) {
    let tab = this.props.children[key];
    return (
      <div
        key={key}
        className={
          this.state.activeIndex == key
            ? "menu-historic__item menu-historic__item--selected active"
            : "menu-historic__item"
        }
        onClick={this.handleOnClickCategory.bind(this, key)}
      >
        <span href="#">{tab.props.title}</span>
      </div>
    );
  }

  renderNavItemCategoryHistoryComparison(key) {
    let tab = this.props.children[key];
    return (
      <div
        key={key}
        className={
          this.state.activeIndex == key
            ? "menu-historic-comp__item menu-historic__item--25 menu-historic__item--selected active"
            : "menu-historic-comp__item menu-historic__item--25"
        }
        onClick={this.handleOnClickCategory.bind(this, key)}
      >
        <span href="#">{tab.props.title}</span>
      </div>
    );
  }

  renderNavItemCategoryPredictionComparison(key) {
    let tab = this.props.children[key];
    return (
      <div
        key={key}
        className={
          this.state.activeIndex == key
            ? "menu-prediction-comp__item menu-prediction__item--selected active"
            : "menu-prediction-comp__item "
        }
        onClick={this.handleOnClickCategory.bind(this, key)}
      >
        <span href="#">{tab.props.title}</span>
      </div>
    );
  }

  renderNavItemCategoryPrediction(key) {
    let tab = this.props.children[key];
    var type = "prediction";
    return (
      <div
        key={key}
        className={
          this.state.activeIndex == key
            ? "menu-prediction__item menu-prediction__item--selected"
            : "menu-prediction__item"
        }
        onClick={this.handleOnClickCategory.bind(this, key)}
      >
        <span href="#">{tab.props.title}</span>
      </div>
    );
  }

  render() {
    let index = 0;
    let active = this.state.activeIndex;
    let tabTitle = this.props.tabTitle;
    let tabToBeDisplayed = null;

    let tabs = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        active: child.props.active === true ? true : active == index++
      });
    });

    switch (tabTitle) {
      case "mainMenu":
        tabToBeDisplayed = (
          <div className="menu">
            <div className="container" /*style="padding: 0px;"*/>
              <div className="row">
                <div className="col-7" /*style="padding-right: 0px;"*/>
                  {Object.keys(this.props.children).map(
                    this.renderNavItemMenu.bind(this)
                  )}
                </div>
                <div className="col-5" />
                <div className="col-12">
                  <div className="tabs-content">{tabs}</div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "categoryMenuHistory":
        tabToBeDisplayed = (
          <div className="row__menu-historic">
            {Object.keys(this.props.children).map(
              this.renderNavItemCategoryHistory.bind(this)
            )}
          </div>
        );
        break;
      case "categoryMenuPrediction":
        tabToBeDisplayed = (
          <div className="row__menu-prediction">
            {Object.keys(this.props.children).map(
              this.renderNavItemCategoryPrediction.bind(this)
            )}
          </div>
        );
        break;
        case "categoryMenuHistoryComparison":
          tabToBeDisplayed = (
            <div className="row__menu-historic">
              {Object.keys(this.props.children).map(
                this.renderNavItemCategoryHistoryComparison.bind(this)
              )}
            </div>
          );
        break;
        case "categoryMenuPredictionComparison":
          tabToBeDisplayed = (
            <div className="row__menu-historic">
              {Object.keys(this.props.children).map(
                this.renderNavItemCategoryPredictionComparison.bind(this)
              )}
            </div>
          );
        break;
    }

    return <div>{tabToBeDisplayed}</div>;
  }
}

export default TabsMenu;
