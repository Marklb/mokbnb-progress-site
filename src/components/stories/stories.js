import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';
import Story from '../story';
import AddStoryMenu from '../add-story-menu';
import EditStoryMenu from '../edit-story-menu';
// import UserSessionHandler from '../../user-session-handler';

// React Components
// import ContextWrapper from '../context-wrapper';
// import TopHeader from '../top-header';
// import ModalsContainer from '../modals-container';
// import Modal from '../modal';
// import LoginForm from '../login-form';
// import SignUpForm from '../signup-form';


require("./stories.scss");

/*
*/
export default class Stories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addStoryMenuVisible: false,
      editStoryMenuVisible: false,
      editStoryVals: {
        'storyKey': '',
        'title': '',
        'desc': '',
        'isFinished': false
      },
      stories: []
    };

    this.toggleAddStoryMenuVisibility = this.toggleAddStoryMenuVisibility.bind(this);
    this.addStory = this.addStory.bind(this);
    this.toggleEditStoryMenuVisibility = this.toggleEditStoryMenuVisibility.bind(this);
    this.editStory = this.editStory.bind(this);
    this.changeEditStoryVal = this.changeEditStoryVal.bind(this);
    this.deleteStoryFunc = this.deleteStoryFunc.bind(this);
    this.toggleStoryFinished = this.toggleStoryFinished.bind(this);


    this.listeningfirebaseRefs = [];
    this.startDatabaseQueries();
  }

  renderNoStories() {
    return (
      <div className="no-stories-panel">
        No stories. Either you are done (Probably not!) or should should add some.
      </div>
    );
  }

  renderEditMenu() {
    console.log('Rend');
    return (
      <EditStoryMenu {...this.state.editStoryVals}
        changeEditStoryVal={this.changeEditStoryVal}
        isVisible={this.state.editStoryMenuVisible}
        onClickModalOuter={this.toggleEditStoryMenuVisibility}
        editStoryFunc={this.editStory}></EditStoryMenu>
    );
  }

  render() {
    return (
      <div>
        <div className="stories-title">Stories</div>

        <div className="stories-container">

          <div className="stories-menu">
            <div className="menu-btn-group">
              <div className="menu-btn"
                onClick={this.toggleAddStoryMenuVisibility}>
                {/* <i className="fa fa-gear fa-fw"></i> */}
                <div className="btn-text">Add Story</div>
              </div>
            </div>
          </div>

          <div className="spacer"></div>
          {this.state.stories.map((val, i) => {
            return (<div key={i}><Story {...val}
              toggleEditStoryMenuVisibility={this.toggleEditStoryMenuVisibility}
              changeEditStoryVal={this.changeEditStoryVal}
              deleteStoryFunc={this.deleteStoryFunc}
              toggleStoryFinished={this.toggleStoryFinished}
              /><div className="spacer"></div></div>);
          })}
          {(this.state.stories.length === 0)? this.renderNoStories() : null}
        </div>

        <AddStoryMenu isVisible={this.state.addStoryMenuVisible}
          onClickModalOuter={this.toggleAddStoryMenuVisibility}
          addStoryFunc={this.addStory}></AddStoryMenu>
        {(this.state.editStoryMenuVisible === true)? this.renderEditMenu() : null}
      </div>
    );
  }

  addStory(title, desc, key = null, newStory = false) {
    let newStoryRef = firebase.database().ref('stories_list').push({
      'storyKey': key,
      'title': title,
      'desc': desc,
      'isFinished': false
    });
    // newStoryRef.set({
    //   'title': title,
    //   'desc': desc
    // });
    // We've appended a new message to the message_list location.
    var path = newStoryRef.toString();
    console.log(path);
  }

  addStoryElement(title, desc, isFinished, key = null, newStory = false) {
    // console.log(`key ${key}`);
    let newState = this.state;
    newState.stories.push({
      storyKey: key,
      title: title,
      desc: desc,
      isFinished: isFinished
    });
    this.setState(newState);
  }

  editStory(title, desc, key) {
    // console.log('editStory');
    // console.log(key);
    // console.log(title);
    // console.log(desc);
    let list = this.state.stories;
    for(let i = 0; i < list.length; i++){
      if(list[i].storyKey == key){
        // console.log(`Found: ${i}  ${list[i].title}`);
        // let newState = this.state;
        // this.state.stories[i].title = title;
        // this.state.stories[i].desc = desc;
        // this.setState(newState);
        firebase.database().ref('stories_list/' + list[i].storyKey).set({
          title: title,
          desc: desc,
          isFinished: list[i].isFinished
        });
        break;
      }
    }
  }

  editStoryElement(title, desc, key) {
    // console.log('editStory');
    // console.log(key);
    // console.log(title);
    // console.log(desc);
    let list = this.state.stories;
    for(let i = 0; i < list.length; i++){
      if(list[i].storyKey == key){
        // console.log(`Found: ${i}  ${list[i].title}`);
        let newState = this.state;
        this.state.stories[i].title = title;
        this.state.stories[i].desc = desc;
        this.setState(newState);
        // firebase.database().ref('stories_list/' + list[i].storyKey).set({
        //   title: title,
        //   desc: desc
        // });
        break;
      }
    }
  }

  deleteStoryFunc(key){
    console.log(`deleteStoryFunc ${key}`);
    // remove()
    // let newState = this.state;
    // newState.editStoryVals = {
    //   'storyKey': key,
    //   'title': title,
    //   'desc': desc
    // }
    // this.setState(newState);
    let list = this.state.stories;
    for(let i = 0; i < list.length; i++){
      if(list[i].storyKey == key){
        // console.log(`Found: ${i}  ${list[i].title}`);
        // let newState = this.state;
        // this.state.stories[i].title = title;
        // this.state.stories[i].desc = desc;
        // this.setState(newState);
        firebase.database().ref('stories_list/' + list[i].storyKey).remove();
        break;
      }
    }
  }

  toggleStoryFinished(key){
    console.log(`toggleStoryFinished ${key}`);
    // remove()
    // let newState = this.state;
    // newState.editStoryVals = {
    //   'storyKey': key,
    //   'title': title,
    //   'desc': desc
    // }
    // this.setState(newState);
    let list = this.state.stories;
    for(let i = 0; i < list.length; i++){
      if(list[i].storyKey == key){
        // console.log(`Found: ${i}  ${list[i].title}`);
        // let newState = this.state;
        // this.state.stories[i].title = title;
        // this.state.stories[i].desc = desc;
        // this.setState(newState);
        firebase.database().ref('stories_list/' + list[i].storyKey).set({
          title: list[i].title,
          desc: list[i].desc,
          isFinished: !list[i].isFinished
        });
        break;
      }
    }
  }

  startDatabaseQueries() {
    console.log('startDatabaseQueries');
    // [START stories_list_query]
    this.storiesListRef = firebase.database().ref('stories_list').limitToLast(100);
    // [END stories_list_query]

    var fetchStories = (storiesRef, sectionElement = null) => {
      storiesRef.on('child_added', (data) => {
        // console.log('childChanged');
        var title = data.val().title || 'No Title';
        var desc = data.val().desc || 'No Description';
        // var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
        // containerElement.insertBefore(
        //   createPostElement(data.key, data.val().title, data.val().body, author, data.val().uid, data.val().authorPic),
        //   containerElement.firstChild);
        var isFinished = false;
        if(data.val().isFinished){
          isFinished = data.val().isFinished;
        }
        this.addStoryElement(title, desc, isFinished, data.key);
      });
      storiesRef.on('child_changed', (data) => {
        // console.log('changed');
        // console.log(data.val());
        var isFinished = false;
        if(data.val().isFinished){
          isFinished = data.val().isFinished;
        }
        this.editStoryElement(data.val().title, data.val().desc, isFinished, data.key);
    		// var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
    		// var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
    		// postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = data.val().title;
    		// postElement.getElementsByClassName('username')[0].innerText = data.val().author;
    		// postElement.getElementsByClassName('text')[0].innerText = data.val().body;
    		// postElement.getElementsByClassName('star-count')[0].innerText = data.val().starCount;
      });
      storiesRef.on('child_removed', (data) => {
        let list = this.state.stories;
        for(let i = 0; i < list.length; i++){
          if(list[i].storyKey == data.key){
            // console.log(`Found: ${i}  ${list[i].title}`);
            // let newState = this.state;
            // this.state.stories[i].title = title;
            // this.state.stories[i].desc = desc;
            // this.setState(newState);
            // firebase.database().ref('stories_list/' + list[i].storyKey).remove();

            let newState = this.state;
            newState.stories.splice(i, 1);
            this.setState(newState);
            break;
          }
        }
    		// var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
    		// var post = containerElement.getElementsByClassName('post-' + data.key)[0];
  	    // post.parentElement.removeChild(post);
      });
    };

    // Fetching and displaying all posts of each sections.
    fetchStories(this.storiesListRef, null);

    // Keep track of all Firebase refs we are listening to.
    this.listeningfirebaseRefs.push(this.storiesListRef);

  }

  /*
  Event Callbacks
  */
  toggleAddStoryMenuVisibility() {
    this.setState({addStoryMenuVisible: !this.state.addStoryMenuVisible});
  }

  toggleEditStoryMenuVisibility() {
    this.setState({editStoryMenuVisible: !this.state.editStoryMenuVisible});
  }

  changeEditStoryVal(title, desc, key){
    let newState = this.state;
    newState.editStoryVals = {
      'storyKey': key,
      'title': title,
      'desc': desc
    }
    this.setState(newState);
  }


};
