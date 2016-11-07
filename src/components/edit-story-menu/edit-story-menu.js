import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';

// React Components


require("./edit-story-menu.scss");

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
export default class EditStoryMenu extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      isModal: true,
      storyTitle: this.props.title,
      storyDesc: this.props.desc
    };

    this.onClickOuter = this.onClickOuter.bind(this);
    this.onClickInner = this.onClickInner.bind(this);
    this.onChangeStoryTitleInput = this.onChangeStoryTitleInput.bind(this);
    this.onChangeStoryDescInput = this.onChangeStoryDescInput.bind(this);
    this.onClickSaveStoryBtn = this.onClickSaveStoryBtn.bind(this);
  }

  renderContent() {
    return (
      <div className="edit-story-menu" onClick={this.onClickInner}>

        <input className="edit-story-menu-title-input"
          type="text" placeholder="Story title..."
          value={this.state.storyTitle}
          onChange={this.onChangeStoryTitleInput}></input>
        <div className="edit-story-menu-desc">
          <textarea placeholder="Story description..."
            value={this.state.storyDesc}
            onChange={this.onChangeStoryDescInput}></textarea>
          <div className="menu-btn-group">
            <div className="menu-btn"
              onClick={this.toggleAddStoryMenuVisibility}>
              {/* <i className="fa fa-gear fa-fw"></i> */}
              <div className="btn-text"
                onClick={this.onClickSaveStoryBtn}>Save</div>
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
      classString = 'edit-story-menu-modal';
    }
    if(this.props.isVisible === false){
      classString = 'edit-story-menu-modal hidden';
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

  onChangeStoryTitleInput(e) {
    this.setState({storyTitle: e.target.value});
  }

  onChangeStoryDescInput(e) {
    this.setState({storyDesc: e.target.value});
  }

  onClickSaveStoryBtn(e) {
    let title = this.state.storyTitle;
    let desc = this.state.storyDesc;
    if(title.length != '' && desc.length != ''){
      // console.log('Save edit story');
      // console.log(this.props.storyKey);
      // console.log(this.state.storyTitle);
      // console.log(this.state.storyDesc);
      this.props.editStoryFunc(
        this.state.storyTitle,
        this.state.storyDesc,
        this.props.storyKey);
      // this.props.addStoryFunc(title, desc, null);
      this.props.onClickModalOuter();
      // this.setState({storyTitle: '', storyDesc: ''});
    }
  }




};

// {
// <div className="opt-btn-group">
//   {/* <i className="fa fa-pencil fa-fw"></i> */}
//   <i className="fa fa-check fa-fw"></i>
//   {/* <i className="fa fa-compress fa-fw"></i> */}
//   <i className={(this.state.expanded === true)? "fa fa-compress fa-fw"
//     : "fa fa-expand fa-fw"}
//     onClick={this.onClickExpandToggle}></i>
//   <i className="fa fa-edit fa-fw"></i>
//   <i className="fa fa-window-maximize fa-fw"
//     onClick={this.onClickWinMaximizeToggle}></i>
//   <i className="fa fa-window-close fa-fw"></i>
// </div>
//
// <div className="story-title">{this.props.title}</div>
// <div className={(this.state.expanded === true)
//   ? "story-desc expanded" : "story-desc"}>{this.props.desc}</div>
// }
