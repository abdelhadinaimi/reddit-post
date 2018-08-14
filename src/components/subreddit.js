import React from 'react';
import Post from './post';
import throttle from 'lodash/throttle';

import notification from "../media/notification.mp3";

class Subreddit extends React.Component{

  constructor(props){
    super(props);

    const callNotification = throttle(()=>{
      const notif = new Notification('New Post(s) !',{
          body: 'New post(s) from r/' + this.state.title
      });
      notif.onclick = function(){
        window.focus();
      }
    },5000);
    const audio = new Audio(notification);
    const playAudio = throttle(() => {
      audio.play();
    });
    this.state = {
      title : props.title,
      collapsed : true,
      callNotification,
      playAudio,
      openedNewPost : false,
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.reddit.hasNewPost){
      this.setState({
        openedNewPost: false,
      });

      if(nextProps.notification) this.state.callNotification();
      if(nextProps.sound) this.state.playAudio();
    }
  }
  
  render(){
      const posts = this.props.reddit.items.map(item => (
        <Post key={item.id} item={item}/>
      ));
      const {isFetching,error,hasNewPost} = this.props.reddit;
      const {openedNewPost} = this.state;
      return(
        <div className="panel panel-default">
          <div className="panel-heading">

          <h4 className="panel-title">
            <a onClick={this.handleClick.bind(this)} style={{cursor:'pointer'}}>{this.props.title}</a>
          </h4>

          <span className="pull-right clickable">

            <button className="btn btn-default" type="button" onClick={this.props.reload}>
              <span className="glyphicon glyphicon-refresh"></span>
            </button>

            <button className="btn btn-default" type="button" onClick={this.props.remove}>
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </span>
        
          <span className="pull-right" style={{marginRight:'5px'}}>
            { isFetching || error ? "" : "Last fetched : " + new Date(this.props.reddit.lastUpdated).toLocaleTimeString()}
          </span>

          <span className="pull-right" style={{marginRight:'15%',color:'red'}}>
            { (isFetching || error || !hasNewPost || openedNewPost)  ? "" : "New Post !"}
          </span>

        </div>
        <div id="collapse1" className={"panel-collapse collapse " + (this.state.collapsed ? "" : "in")}>
          <div className="panel-body">
            { isFetching ? "Fetching posts..." : (error ? "Can't fetch posts" : posts) }
          </div>
        </div>
      </div>

      )
  }

  handleClick(){
    this.setState( prevState =>({
      collapsed : !prevState.collapsed,
      openedNewPost : true
    }));
  }
}


export default Subreddit;
