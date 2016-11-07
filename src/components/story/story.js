import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';

// React Components
import ConfirmationButton from '../confirmation-button';

require("./story.scss");

/*
*/
export default class Story extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isModal: false,
      deleteStoryConfirmationBtnStoryKey: '',
      isDeleteStoryConfirmationBtnVisible: false,
      isFinished: this.props.isFinished
    };

    this.onClickOuter = this.onClickOuter.bind(this);
    this.onClickInner = this.onClickInner.bind(this);
    this.onClickExpandToggle = this.onClickExpandToggle.bind(this);
    this.onClickWinMaximizeToggle = this.onClickWinMaximizeToggle.bind(this);
    this.onClickEditStory = this.onClickEditStory.bind(this);
    this.hideDeleteStoryConfirmationBtn = this.hideDeleteStoryConfirmationBtn.bind(this);
    this.onConfirmDeleteStory = this.onConfirmDeleteStory.bind(this);
    this.onClickToggleFinished = this.onClickToggleFinished.bind(this);
  }

  renderDeleteStoryConfirmationButton() {
    return (
      <ConfirmationButton
        text="Are you sure you want to delete this story?"
        onClickYes={this.onConfirmDeleteStory}
        onClickNo={this.hideDeleteStoryConfirmationBtn}
        onClickModalOuter={this.hideDeleteStoryConfirmationBtn}>
      </ConfirmationButton>
      );
  }

  renderContent() {
    let storyClassName = 'story';
    if(this.state.isFinished === true){
      storyClassName += ' finished';
    }
    return (
      <div className={storyClassName} onClick={this.onClickInner}>

        <div className="opt-btn-group">
          {/* <i className="fa fa-pencil fa-fw"></i> */}
          <i className="fa fa-check fa-fw finished-check"
            onClick={this.onClickToggleFinished}></i>
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

        <div className="story-title">
          {this.props.title}
          {(this.state.isFinished === true)? "[Finished]": null}
        </div>
        <div className={(this.state.expanded === true)
          ? "story-desc expanded" : "story-desc"}>{this.props.desc.split('\n').map((val, i) => {
            return (<div key={i}>{val}</div>);
          })}</div>
        {/* Comments */}
        {/* <i className="fa fa-angle-down fa-fw"></i> */}
        {(this.state.isDeleteStoryConfirmationBtnVisible === true) ?
          this.renderDeleteStoryConfirmationButton() : null}
      </div>
    );
  }

  render() {
    return (
      <div className={(this.state.isModal === true) ? "story-modal" : null}
         onClick={this.onClickOuter}>
        {this.renderContent()}
      </div>
    );
  }

  /*
  Event Callbacks
  */
  onClickOuter(e) {
    // this.props.onClickModalOuter();
    if(this.state.isModal === true){
      this.setState({isModal: false});
    }
  }

  onClickInner(e) {
    e.stopPropagation();
  }

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
    // this.props.deleteStoryFunc(key);
    this.setState({
      deleteStoryConfirmationBtnStoryKey: key,
      isDeleteStoryConfirmationBtnVisible: true
    });
  }

  hideDeleteStoryConfirmationBtn() {
    this.setState({
      deleteStoryConfirmationBtnStoryKey: '',
      isDeleteStoryConfirmationBtnVisible: false
    });
  }

  onConfirmDeleteStory(e) {
    this.props.deleteStoryFunc(this.state.deleteStoryConfirmationBtnStoryKey);
    this.hideDeleteStoryConfirmationBtn();
  }

  onClickToggleFinished(e) {
    this.props.toggleStoryFinished(this.props.storyKey);
    this.setState({isFinished: !this.state.isFinished});
  }


};
