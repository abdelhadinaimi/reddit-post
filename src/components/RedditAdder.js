import React from 'react';
import { connect } from 'react-redux';
import {fetchPostsIfNeeded} from '../actions/redditActions';
import {openSettingsModal} from '../actions/utilActions';
// \A[A-Za-z0-9][A-Za-z0-9_]{1,20}\Z
const regex = new RegExp('^[A-Za-z0-9][A-Za-z0-9_]{1,20}$');

const ErrorMessage = ({message,closeError}) => (
  <div className="alert alert-danger" role="alert" style={{marginBottom:'0px',padding:'8px 15px'}}>
    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" style={{paddingRight:'5px'}}></span>
    <span className="sr-only">Error:</span>
    <span className="pull-right clickable">
      <button className="error-close btn btn-default" type="button" onClick={closeError}>
        <span className="glyphicon glyphicon-remove"/>
      </button>
    </span>
    {message}
  </div>
);

class redditAdder extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value : "",
      error : ""
    }
  }
  render(){

    return(
      <form onSubmit={(e)=>this.handleSubmit(e)}>
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Type the subreddit you want to add ex: 'worldnews'"
              onChange={this.handleChange.bind(this)} value={this.state.value}/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit" style={{border:'1px solid #cccccc'}}>
                <span className="glyphicon glyphicon-plus"/>
              </button>
              <button className="btn btn-default" type="button" style={{border:'1px solid #cccccc',borderLeft:'0px'}} onClick={()=>this.handleOpenSettingsModal()}>
                <span className="glyphicon glyphicon-cog"/>
              </button>
            </span>
        </div>
        { this.state.error !== "" ? <ErrorMessage message={this.state.error} closeError={this.clearError.bind(this)}/> : null}
      </form>
    )
  }
  handleOpenSettingsModal(){
    const {dispatch} = this.props;
    dispatch(openSettingsModal());
  }
  handleSubmit(e){
    e.preventDefault();
    const {dispatch} = this.props;
    if(this.state.value.length > 21)
      this.setState({error: "Subreddit must be 21 or less characters"});
    else if(!regex.test(this.state.value))
      this.setState({error: "Subreddit must contain only characters, numbers and _"});
    else{
        dispatch(fetchPostsIfNeeded(this.state.value));
        this.clearError();
    }
    this.setState({value: ""});

  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  clearError(){
      this.setState({error: ""});
  }
  handleSettings(e){
    e.preventDefault();
  }
}

const RedditAdder = connect(null)(redditAdder);

export default RedditAdder;
