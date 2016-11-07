import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';

// React Components


require("./story.scss");

/*
*/
export default class Story extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isModal: false
    };

    this.onClickExpandToggle = this.onClickExpandToggle.bind(this);
    this.onClickWinMaximizeToggle = this.onClickWinMaximizeToggle.bind(this);
    this.onClickEditStory = this.onClickEditStory.bind(this);
  }

  renderContent() {
    return (
      <div className="story">

        <div className="opt-btn-group">
          {/* <i className="fa fa-pencil fa-fw"></i> */}
          <i className="fa fa-check fa-fw"></i>
          {/* <i className="fa fa-compress fa-fw"></i> */}
          <i className={(this.state.expanded === true)? "fa fa-compress fa-fw"
            : "fa fa-expand fa-fw"}
            onClick={this.onClickExpandToggle}></i>
          <i className="fa fa-edit fa-fw"
            onClick={this.onClickEditStory}></i>
          <i className="fa fa-window-maximize fa-fw"
            onClick={this.onClickWinMaximizeToggle}></i>
          <i className="fa fa-window-close fa-fw"
            onClick={this.onClickDeleteStory.bind(this, this.props.storyKey)}></i>
        </div>

        <div className="story-title">{this.props.title}</div>
        <div className={(this.state.expanded === true)
          ? "story-desc expanded" : "story-desc"}>{this.props.desc.split('\n').map((val, i) => {
            return (<div key={i}>{val}</div>);
          })}</div>
        {/* Comments */}
        {/* <i className="fa fa-angle-down fa-fw"></i> */}
      </div>
    );
  }

  render() {
    return (
      <div className={(this.state.isModal === true) ? "story-modal" : null}>
        {this.renderContent()}
      </div>
    );
  }

  /*
  Event Callbacks
  */

  onClickExpandToggle(e) {
    this.setState({expanded: !this.state.expanded});
  }

  onClickWinMaximizeToggle(e) {
    this.setState({isModal: !this.state.isModal});
  }

  onClickEditStory(e) {
    this.props.changeEditStoryVal(this.props.title, this.props.desc, this.props.storyKey);
    this.props.toggleEditStoryMenuVisibility();
  }

  onClickDeleteStory(key, e) {
    console.log(`onClickDeleteStory:: ${key}`);
    console.log(key);
    this.props.deleteStoryFunc(key);
  }



};
