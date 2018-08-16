import React from "react";
import { connect } from "react-redux";

import Subreddit from "./Subreddit";

import {
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../actions/redditActions";

import { Dispatch } from "redux";
import { removeSubreddit } from "../actions/listActions";
import { IPostsBySubreddit, ISettings, IState } from "../types/interfaces";

interface IProps {
  postsBySubreddit: IPostsBySubreddit;
  settings: ISettings;
}
interface IDispatchProps {
  handleReload: (subreddit : string) => void;
  handleRemove: (subreddit : string) => void;
  dispatchAll: (subredditList : string[], invalidate : boolean) => void;
}
type Props = IProps & IDispatchProps;
class SubredditList extends React.Component<Props> {
  constructor(props : Props) {
    super(props);
  }
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
            settings={this.props.settings}
          />
        ))}
      </div>
    );
  }

  public componentDidMount() {
    const {postsBySubreddit, dispatchAll } = this.props;
    dispatchAll(getSubList(postsBySubreddit),false);
    this.reloadAll(dispatchAll);
  }

  // setTimeout was used so that after everytime internalCallback is called we get the the props too
  private reloadAll = (dispatchAll : any) => {
    const internalCallback = () => {
      const { postsBySubreddit, settings } = this.props;

      dispatchAll(getSubList(postsBySubreddit), true);
      setTimeout(() => internalCallback(), settings.delay * 1000);
    };
    internalCallback();
  };
}

// Returns an array of subreddits from the object postsBySubreddit
const getSubList: (
  postsBySubreddit: IPostsBySubreddit
) => string[] = postsBySubreddit =>
  Object.entries(postsBySubreddit).map(sub => sub[0]);

const mapStateToProps = (state: IState): IProps => ({
  postsBySubreddit: state.postsBySubreddit,
  settings: state.settings
});

const mapDispatchToProps = (dispatch: Dispatch<any>) : IDispatchProps => ({
  // dispatchs fetchPostsIfNeeded for all the provided subreddits in redditList
  dispatchAll: (redditList,invalidate = false) => {
    redditList.forEach(subreddit => {
      if (invalidate) {
        dispatch(invalidateSubreddit(subreddit));
      }
      dispatch(fetchPostsIfNeeded(subreddit));
    });
  },
  handleReload: (subreddit) => {
    dispatch(invalidateSubreddit(subreddit));
    dispatch(fetchPostsIfNeeded(subreddit));
  },
  handleRemove: (subreddit) => {
    dispatch(removeSubreddit(subreddit));
  },

});

export default connect<IProps,IDispatchProps>(mapStateToProps,mapDispatchToProps)(SubredditList);
