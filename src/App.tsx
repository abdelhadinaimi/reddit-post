import * as React from 'react';

import RedditAdder from './containers/RedditAdder';
import SettingsModal from './containers/SettingsModal';
import SubredditList from './containers/SubredditList';

import './styles/App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="container">
        <h1>Reddit Posts</h1>
        <SettingsModal/>
        <RedditAdder/>
        <SubredditList/>
      </div>
    );
  }
}

export default App;
