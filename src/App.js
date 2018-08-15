import React, { Component } from 'react';
import SubredditList from './components/SubredditList';
import RedditAdder from './components/RedditAdder';
import SettingsModal from './components/SettingsModal';
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
