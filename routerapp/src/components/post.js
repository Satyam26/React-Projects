import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  state = {
    post: null
  }

  componentDidMount() {
    let id = this.props.match.params.postId;
    axios.get('https://jsonplaceholder.typicode.com/posts/' + id).then(res => {
      this.setState({ post: res.data });
    })

  }
  render() {

    const post = this.state.post ? (<div>
      <h3 className="red-text center yellow lighten-4">{this.state.post.title}</h3>
      <p>{this.state.post.body}</p>
    </div>) : (<p className="center"> Loading... </p>);

    return (
      <div className="container">
        {post}
      </div>
    );
  }
}

export default Post;