import * as React from "react";

import Post from "./Post";

import { IPost, IPostBySubreddit, ISettings } from "../types/interfaces";

export interface IProps {
  reddit: IPostBySubreddit;
  title: string;
  settings: ISettings;
  onReload: any;
  onRemove: any;
  callNotification?: any;
  playAudio?: any;
}
interface IState {
  collapsed: boolean;
  openedNewPost: boolean;
}


class Subreddit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);   
    this.state = {
      collapsed: true,
      openedNewPost: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { playAudio, callNotification, settings} = nextProps;
    if (nextProps.reddit.hasNewPost) {
      this.setState({
        openedNewPost: false
      });

      if (settings.notification && callNotification) {
        callNotification();
      }
      
      if (settings.sound && playAudio) {
        playAudio();
      }
    }
  }

  public render() {
    const posts = this.props.reddit.items.map((item: IPost) => (
      <Post key={item.id} {...item} />
    ));
    const { isFetching, error, hasNewPost } = this.props.reddit;
    const { onReload, onRemove } = this.props;
    const { openedNewPost } = this.state;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a onClick={this.handleClick} style={{ cursor: "pointer" }}>
              {this.props.title}
            </a>
          </h4>

          <span className="pull-right clickable">
            <button
              className="btn btn-default"
              type="button"
              onClick={onReload}
            >
              <span className="glyphicon glyphicon-refresh" />
            </button>

            <button
              className="btn btn-default"
              type="button"
              onClick={onRemove}
            >
              <span className="glyphicon glyphicon-remove" />
            </button>
          </span>

          <span className="time-span pull-right" style={{ marginRight: "5px" }}>
            {isFetching || error
              ? ""
              : "Last fetched : " +
                new Date(this.props.reddit.lastUpdated).toLocaleTimeString()}
          </span>

          <span className="info-span pull-right">
            {isFetching || error || !hasNewPost || openedNewPost
              ? ""
              : "New Post !"}
          </span>
        </div>
        <div
          id="collapse1"
          className={
            "panel-collapse collapse " + (this.state.collapsed ? "" : "in")
          }
        >
          <div className="panel-body">
            {isFetching
              ? "Fetching posts..."
              : error
                ? "Can't fetch posts"
                : posts}
          </div>
        </div>
      </div>
    );
  }

  public handleClick() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
      openedNewPost: true
    }));
  }
}

export default Subreddit;
