export const ADD_SUBREDDIT_ERROR = 'ADD_SUBREDDIT_ERROR';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_SUBREDDIT_ERROR = 'FETCH_SUBREDDIT_ERROR';
export const SUBREDDIT_EXIST_ERROR = 'SUBREDDIT_EXIST_ERROR';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export function addSubredditError(error) {
  return {
    type: ADD_SUBREDDIT_ERROR,
    error
  }
}
export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error
  }
}
export function subredditExistError(error) {
  return {
    type: SUBREDDIT_EXIST_ERROR,
    error
  }
}
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
export function fetchSubredditError(subreddit){
  return {
    type: FETCH_SUBREDDIT_ERROR,
    subreddit
  }
}
