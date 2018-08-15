import React from 'react';


const Post = ({item}) => (
    <li><a href={'https://www.reddit.com'+item.permalink}>{item.title}</a></li>
);

export default Post;
