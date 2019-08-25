import React from 'react';
import '../App.scss';


class TabsMenu extends React.Component {
      state = {
        activeIndex : 0,
      }

      handleOnClick(key, event) {
          event.preventDefault();
          this.setState({
              activeIndex : key,
          });
      }

      handleOnClickCategory(key, event) {
        let tabTitle = this.props.tabTitle;
        let tab = this.props.children[key];
        event.preventDefault();
        this.setState({
            activeIndex : key,
        });
        
        tab.props.changeChartData(key, tabTitle);
    }
  
      renderNavItem(key) {
          let tab = this.props.children[key];
          return (
            <div key={ key } className={ this.state.activeIndex == key ? ' manu__item manu__item--selected active' : 'manu__item'} onClick={ this.handleOnClick.bind(this, key) }>
                <span href="#">{ tab.props.title }</span>
            </div>
          );
      }

      renderNavItemCategoryHistory(key) {
            let tab = this.props.children[key];
            var type = "history";
            return (
            <div key={ key } className={ this.state.activeIndex == key ? 'menu-historic__item menu-historic__item--selected active' : 'menu-historic__item'} onClick={this.handleOnClickCategory.bind(this, key)}>
              <span href="#">{ tab.props.title }</span>
          </div>
        );
      }

      renderNavItemCategoryPrediction(key) {
            let tab = this.props.children[key];
            var type = "prediction";
            return (
            <div key={ key } className={ this.state.activeIndex == key ? 'menu-prediction__item menu-prediction__item--selected' : 'menu-prediction__item'} onClick={this.handleOnClickCategory.bind(this, key)}>
            <span href="#">{ tab.props.title }</span>
        </div>
        );
      }
    
      render() {
          let index = 0;
          let active = this.state.activeIndex;
          let tabTitle = this.props.tabTitle;
          let tabToBeDisplayed = null;
  
          let tabs = React.Children.map(this.props.children, function (child) {
              return React.cloneElement(child, {
                  active : child.props.active === true ? true : (active == index++)
              });
          });

          switch(tabTitle) {
            case 'mainMenu':
                tabToBeDisplayed = <div className="menu">
                                        <div className="container" /*style="padding: 0px;"*/>
                                            <div className="row">
                                                <div className="col-7" /*style="padding-right: 0px;"*/>
                                                    { Object.keys(this.props.children).map(this.renderNavItem.bind(this)) }
                                                </div>
                                                <div className="col-5"></div>
                                                <div className="col-12">
                                                <div className="tabs-content">
                                                    { tabs }
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                break;
            case 'categoryMenuHistory':
                tabToBeDisplayed =  <div className="row__menu-historic">
                                            { Object.keys(this.props.children).map(this.renderNavItemCategoryHistory.bind(this)) }
                                    </div>
                break;
            case 'categoryMenuPrediction':
                tabToBeDisplayed =  <div className="row__menu-prediction">
                                            { Object.keys(this.props.children).map(this.renderNavItemCategoryPrediction.bind(this)) }
                                    </div>
                break;
          }

          return (
            <div>{tabToBeDisplayed}</div>
          )
      }
  }

  export default TabsMenu;