import React, { Component } from 'react';
import SubredditList from './components/subredditList';
import RedditAdder from './components/redditAdder';
import SettingsModal from './components/settingsModal';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Reddit Post</h1>
        <SettingsModal/>
        <RedditAdder/>
        <SubredditList/>
      </div>
    );
  }
}

export default App;
