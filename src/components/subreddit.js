import React from 'react';
import Post from './post';
import throttle from 'lodash/throttle';
class Subreddit extends React.Component{

  constructor(props){
    super(props);
    const callNotification = throttle(()=>{
        new Notification('New Post(s) !',{
          body: 'New post(s) from r/' + props.title
      })
    },5000);
    callNotification.onClick = function(event){
      event.parent.focus();
      window.focus();
      event.target.close();
    }

    this.state = {
      collapsed : true,
      callNotification
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.reddit.hasNewPost && nextProps.notification){
      this.state.callNotification();
    }
  }
  render(){
      const posts = this.props.reddit.items.map( item => (
            <Post  key={item.id} item={item}/>
      ));
      const {isFetching,error,hasNewPost} = this.props.reddit;

      return(
        <div className="panel panel-default">
          <div className="panel-heading">

          <h4 className="panel-title">
            <a onClick={this.handleClick.bind(this)} style={{cursor:'pointer'}}>{this.props.title}</a>
          </h4>

          <span className="pull-right clickable">
            <button className="btn btn-default" type="button" onClick={this.props.reload}><span className="glyphicon glyphicon-refresh"></span></button>
            <button className="btn btn-default" type="button" onClick={this.props.remove}><span className="glyphicon glyphicon-remove"></span></button>
          </span>
          <span className="pull-right" style={{marginRight:'5px'}}>{ isFetching || error ? "" : "Last fetched : " + new Date(this.props.reddit.lastUpdated).toLocaleTimeString()}</span>
          <span className="pull-right" style={{marginRight:'15%',color:'red'}}>{ isFetching || error || !hasNewPost ? "" : "New Post !"}</span>
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
      collapsed : !prevState.collapsed
    }));
  }
}


export default Subreddit;
