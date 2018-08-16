import * as React from "react";
import { IPost } from "../interfaces";

const Post = (item: IPost) => (
  <li key={item.id}>
    <a href={"https://www.reddit.com" + item.permalink}>{item.title}</a>
  </li>
);

export default Post;
