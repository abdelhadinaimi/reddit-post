import * as React from 'react';
import RedditAdder from './components/RedditAdder';
import SettingsModal from './components/SettingsModal';
import SubredditList from './components/SubredditList';

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
