import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';

// React Components


require("./confirmation-button.scss");

function getScrollbarWidth() {
  var outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = "scroll";

  // add innerdiv
  var inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

/*
*/
export default class ConfirmationButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      isModal: true
    };

    this.onClickOuter = this.onClickOuter.bind(this);
    this.onClickInner = this.onClickInner.bind(this);
  }

  renderContent() {
    return (
      <div className="confirmation-button" onClick={this.onClickInner}>
        <div className="message-text">{this.props.text}</div>
        <div >
          <div className="btn-group">
            <div className="btn no"
              onClick={this.props.onClickNo}>
              {/* <i className="fa fa-gear fa-fw"></i> */}
              <div className="btn-text">No</div>
            </div>
            <div className="btn yes"
              onClick={this.props.onClickYes}>
              {/* <i className="fa fa-gear fa-fw"></i> */}
              <div className="btn-text">Yes</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if(this.props.isVisible === true){
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = getScrollbarWidth()+'px';
    }else{
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    }

    let classString = '';
    if(this.state.isModal === true){
      classString = 'confirmation-button-modal';
    }
    if(this.props.isVisible === false){
      classString = 'confirmation-button-modal hidden';
    }

    return (
      <div className={classString} onClick={this.onClickOuter}>
        {this.renderContent()}
      </div>
    );
  }

  /*
  Event Callbacks
  */
  onClickOuter(e) {
    this.props.onClickModalOuter();
  }

  onClickInner(e) {
    e.stopPropagation();
  }






};
