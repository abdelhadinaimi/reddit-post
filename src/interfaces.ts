// a single subreddit post object
export interface IPost {
  id: number;
  permalink: string;
  title: string;
}

// a
export interface IReddit {
  posts: IPost[];
  receivedAt: number;
  subreddit: string;
  type: string;
}

export interface IPostBySubreddit {
  didInvalidate: boolean;
  error: boolean;
  hasNewPost: boolean;
  isFetching: boolean;
  items: IPost[];
  lastUpdated: number;
}

export interface ISettings {
  delay : number;
  notification : boolean;
  sound : boolean;
}

export interface IUtils {
  settingsModalOpen : boolean;
}

export interface IPostsBySubreddit  {
  [key: string]: IPostBySubreddit;
};

export interface IState {
  errors: string; // TODO Expand the error object
  postsBySubreddit: IPostsBySubreddit
  settings : ISettings;
  utils : IUtils;
}
export type DispatchFunc = (action: any) => void;
