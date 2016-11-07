import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// Javascript Modules
import _ from 'lodash';
import Story from '../story';
import AddStoryMenu from '../add-story-menu';
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
      stories: [
        // {'title': 'View user profile', 'desc': 'As a user I can view the profile of my user or another user.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc':
        // `As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.
        // As a user I can view the listing of a host.`},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'View listing', 'desc': 'As a user I can view the listing of a host.'},
        // {'title': 'Edit listing', 'desc': 'As a host I can edit my listing.'}
      ]
    };

    // this.addStory('The new story', 'As a member I should be able to do this.');
    // this.addStory('View user profile', 'As a user I can view the profile of my user or another user.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing',
    // `As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.
    // As a user I can view the listing of a host.`);
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('View listing', 'As a user I can view the listing of a host.');
    // this.addStory('Edit listing', 'As a host I can edit my listing.');

    // this.storiesListRef = firebase.database().ref('stories_list');

    this.toggleAddStoryMenuVisibility = this.toggleAddStoryMenuVisibility.bind(this);
    this.addStory = this.addStory.bind(this);

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
            return (<div key={i}><Story {...val} /><div className="spacer"></div></div>);
          })}
          {(this.state.stories.length === 0)? this.renderNoStories() : null}
        </div>

        <AddStoryMenu isVisible={this.state.addStoryMenuVisible}
          onClickModalOuter={this.toggleAddStoryMenuVisibility}
          addStoryFunc={this.addStory}></AddStoryMenu>
      </div>
    );
  }

  addStory(title, desc, key = null, newStory = false) {
    let newStoryRef = firebase.database().ref('stories_list').push({
      'title': title,
      'desc': desc
    });
    // newStoryRef.set({
    //   'title': title,
    //   'desc': desc
    // });
    // We've appended a new message to the message_list location.
    var path = newStoryRef.toString();
    console.log(path);
  }

  addStoryElement(title, desc, key = null, newStory = false) {
    let newState = this.state;
    newState.stories.push({
      title: title,
      desc: desc
    });
    this.setState(newState);
  }

  startDatabaseQueries() {
    console.log('startDatabaseQueries');
    // [START stories_list_query]
    this.storiesListRef = firebase.database().ref('stories_list').limitToLast(100);
    // [END stories_list_query]

    var fetchStories = (storiesRef, sectionElement = null) => {
      storiesRef.on('child_added', (data) => {
        console.log('childChanged');
        var title = data.val().title || 'No Title';
        var desc = data.val().desc || 'No Description';
        // var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
        // containerElement.insertBefore(
        //   createPostElement(data.key, data.val().title, data.val().body, author, data.val().uid, data.val().authorPic),
        //   containerElement.firstChild);
        this.addStoryElement(title, desc, data.key);
      });
      storiesRef.on('child_changed', (data) => {
    		// var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
    		// var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
    		// postElement.getElementsByClassName('mdl-card__title-text')[0].innerText = data.val().title;
    		// postElement.getElementsByClassName('username')[0].innerText = data.val().author;
    		// postElement.getElementsByClassName('text')[0].innerText = data.val().body;
    		// postElement.getElementsByClassName('star-count')[0].innerText = data.val().starCount;
      });
      storiesRef.on('child_removed', (data) => {
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


};
