import * as React from "react";
import { IPost } from "../types/interfaces";

const Post = (item: IPost) => (
  <li>
    <a href={"https://www.reddit.com" + item.permalink}>{item.title}</a>
  </li>
);

export default Post;
