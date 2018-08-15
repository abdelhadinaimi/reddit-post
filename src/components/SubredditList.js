import React from 'react';
import Subreddit from './Subreddit';
import { connect } from 'react-redux';
import {invalidateSubreddit,fetchPostsIfNeeded} from '../actions/redditActions';
import {removeSubreddit} from '../actions/listActions';

class subredditList extends React.Component{
    render(){
      return(
        <div>
          {Object.entries(this.props.postsBySubreddit).map(value => (
            <Subreddit
              key={value[0]}
              title={value[0]}
              reddit={value[1]}
              reload={()=>this.handleReload(value[0])}
              remove={()=>this.handleRemove(value[0])}
              notification={this.props.notification}
              sound={this.props.sound}/>
          ))}
        </div>
    )}

    componentDidMount(){
      const {dispatch,postsBySubreddit} = this.props;
      dispatchAll(dispatch,getSubList(postsBySubreddit));
      this.reloadAll(dispatch,getSubList(postsBySubreddit));
    }

    componentWillReceiveProps(nextProps) {
    }

    //This will invalidate a subreddit and then try to fetch it again
    handleReload = (reddit) => {
      const {dispatch} = this.props;
      dispatch(invalidateSubreddit(reddit));
      dispatch(fetchPostsIfNeeded(reddit));
    }

    handleRemove = (reddit) => {
      const {dispatch} = this.props;
      dispatch(removeSubreddit(reddit));
    }

    reloadAll = () => {
      //let props = this.props;
      const internalCallback = () => {
        const {dispatch,postsBySubreddit} = this.props;
        let {delay} = this.props;
        if(!Number.isInteger(delay) || delay < 5) delay = 5;

        dispatchAll(dispatch,getSubList(postsBySubreddit),true);
        setTimeout(()=>internalCallback(),delay*1000);
      }
      internalCallback();
    }
}
//dispatchs fetchPostsIfNeeded for all the provided redditList
const dispatchAll = (dispatch,redditList,invalidate = false) => {
  redditList.forEach(subreddit => {
    if(invalidate) dispatch(invalidateSubreddit(subreddit));
    dispatch(fetchPostsIfNeeded(subreddit));
  });
}

//Returns an array of subreddits from the object postsBySubreddit
const getSubList = (postsBySubreddit) => (
    Object.entries(postsBySubreddit).map(sub => sub[0])
)

const getNewPosts = (postsBySubreddit) => (
  Object.entries(postsBySubreddit).map(sub => {
    if(sub[1].hasNewPost) return sub[0]
  })
)

const mapStateToProps = (state) => ({
  postsBySubreddit: state.postsBySubreddit,
  delay: state.settings.delay,
  notification: state.settings.notification,
  sound: state.settings.sound,
})
const SubredditList = connect(
  mapStateToProps
)(subredditList);

export default SubredditList;
