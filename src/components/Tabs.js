import React from 'react';
import '../App.scss';


class Tabs extends React.Component {

   /* state = {
      activeIndex : 0
    }
    handleOnClick(key, event) {
        event.preventDefault();
        this.setState({
            activeIndex : key
        });
    }

    renderNavItem(key) {
        let tab = this.props.children[key];
        return (
            <li key={ key } className={ this.state.activeIndex == key ? 'active' : ''}>
                <a href="#" onClick={ this.handleOnClick.bind(this, key) }>{ tab.props.title }</a>
            </li>
        );
    }
  
    render() {
        let index = 0;
        let active = this.state.activeIndex;

        let tabs = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                active : child.props.active === true ? true : (active == index++)
            });
        });
        return (
            <div className={ this.props.className }>
                <ul className="tabs-nav">
                    { Object.keys(this.props.children).map(this.renderNavItem.bind(this)) }
                </ul>
                <div className="tabs-content">
                    { tabs }
                </div>
            </div>

 
        )
    }*/

      state = {
        activeIndex : 0
      }
      handleOnClick(key, event) {
          event.preventDefault();
          this.setState({
              activeIndex : key
          });
      }
  
      renderNavItem(key) {
          let tab = this.props.children[key];
          return (
            <div key={ key } className={ this.state.activeIndex == key ? ' manu__item manu__item--selected active' : 'manu__item'} onClick={ this.handleOnClick.bind(this, key) }>
                <span href="#">{ tab.props.title }</span>
            </div>
          );
      }
    
      render() {
          let index = 0;
          let active = this.state.activeIndex;
  
          let tabs = React.Children.map(this.props.children, function (child) {
              return React.cloneElement(child, {
                  active : child.props.active === true ? true : (active == index++)
              });
          });
          return (
              
            <div className="menu">
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
  
   
          )
      }
  }

  export default Tabs;