import { throttle } from "lodash";
import React from "react";

import Post from "./Post";

import { IPost, IPostBySubreddit, ISettings } from "../interfaces";
import notification from "../media/notification.mp3";

interface IProps {
  reddit : IPostBySubreddit;
  title : string;
  settings : ISettings;
  onReload : any;
  onRemove : any;
}
interface IState {
  callNotification : () => void;
  collapsed : boolean;
  openedNewPost : boolean;
  playAudio : () => void;
}
class Subreddit extends React.Component<IProps,IState> {
  constructor(props : IProps) {
    super(props);

    const callNotification = throttle(() => {
      const notif = new Notification("New Post(s) !", {
        body: "New post(s) from r/" + this.props.title
      });
      notif.onclick = () => {
        window.focus();
      };
    }, 5000);

    const audio = new Audio(notification);
    const playAudio = throttle(() => {
      audio.play();
    });
    this.state = {
      callNotification,
      collapsed: true,
      openedNewPost: false,
      playAudio,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public componentWillReceiveProps(nextProps : IProps) {
    if (nextProps.reddit.hasNewPost) {
      this.setState({
        openedNewPost: false
      });

      if (nextProps.settings.notification) {
        this.state.callNotification();
      }
      if (nextProps.settings.sound) {
        this.state.playAudio();
      }
    }
  }

  public render() {
    const posts = this.props.reddit.items.map((item : IPost)  => (
      <Post key={item.id} {...item}/>
    ));
    const { isFetching, error, hasNewPost} = this.props.reddit;
    const { onReload, onRemove } = this.props;
    const { openedNewPost } = this.state;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a
              onClick={this.handleClick}
              style={{ cursor: "pointer" }}
            >
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
