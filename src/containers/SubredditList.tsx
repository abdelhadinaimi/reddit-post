import { throttle } from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Subreddit from "../components/Subreddit";

import notification from "../media/notification.mp3";
const audio = new Audio(notification);

import { removeSubreddit } from "../actions/listActions";
import {
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../actions/redditActions";

import { IPostsBySubreddit, ISettings, IState } from "../types/interfaces";


interface IStateProps {
  postsBySubreddit: IPostsBySubreddit;
  settings: ISettings;
}
interface IDispatchProps {
  handleReload: (subreddit: string) => void;
  handleRemove: (subreddit: string) => void;
  dispatchAll: (subredditList: string[], invalidate: boolean) => void;
}
type Props = IStateProps & IDispatchProps;

class SubredditList extends React.Component<Props> {
  public render() {
    return (
      <div>
        {Object.entries(this.props.postsBySubreddit).map(value => (
          <Subreddit
            key={value[0]}
            title={value[0]}
            reddit={value[1]}
            onReload={this.props.handleReload.bind(this, value[0])}
            onRemove={this.props.handleRemove.bind(this, value[0])}
            callNotification={this.createCallNotification(value[0])}
            playAudio={this.createPlayAudio()}
            settings={this.props.settings}
          />
        ))}
      </div>
    );
  }

  public componentDidMount() {
    const { postsBySubreddit, dispatchAll } = this.props;
    dispatchAll(getSubList(postsBySubreddit), false);
    this.reloadAll(dispatchAll);
  }

  private createCallNotification(subreddit: string) {
    return throttle(() => {
      const notif = new Notification("New Post(s) !", {
        body: "New post(s) from r/" + subreddit
      });
      notif.onclick = () => {
        window.focus();
      };
    }, 5000);
  }

  private createPlayAudio() {
    return throttle(() => {
      audio.play();
    });
  }

  // setTimeout was used so that after everytime internalCallback is called we get the the props too
  private reloadAll = (dispatchAll: any) => {
    const internalCallback = () => {
      const { postsBySubreddit, settings } = this.props;
      dispatchAll(getSubList(postsBySubreddit), true);
      const n =
        Number.isNaN(settings.delay) || settings.delay < 5 ? 5 : settings.delay;
      setTimeout(() => internalCallback(), n * 1000);
    };
    internalCallback();
  };
}

// Returns an array of subreddits from the object postsBySubreddit
const getSubList: (postsBySubreddit: IPostsBySubreddit) => string[] = postsBySubreddit =>
  Object.entries(postsBySubreddit).map(sub => sub[0]);

const mapStateToProps = (state: IState): IStateProps => ({
  postsBySubreddit: state.postsBySubreddit,
  settings: state.settings
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  // dispatchs fetchPostsIfNeeded for all the provided subreddits in redditList
  dispatchAll: (redditList, invalidate = false) => {
    redditList.forEach(subreddit => {
      if (invalidate) {
        dispatch(invalidateSubreddit(subreddit));
      }
      dispatch(fetchPostsIfNeeded(subreddit));
    });
  },
  handleReload: subreddit => {
    dispatch(invalidateSubreddit(subreddit));
    dispatch(fetchPostsIfNeeded(subreddit));
  },
  handleRemove: subreddit => {
    dispatch(removeSubreddit(subreddit));
  }
});

export default connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SubredditList);
