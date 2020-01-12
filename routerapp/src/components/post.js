import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deletePost} from '../actions/postAction';
class Post extends Component {

  handleClick = () => {
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/');
  } 

  render() {
    console.log(this.props);
    const post = this.props.post ? (<div>
      <h3 className="red-text center yellow lighten-4">{this.props.post.title}</h3>
      <p>{this.props.post.body}</p>
      <div className="center">
      <button className="btn waves-effect waves-light red darken-3" onClick={this.handleClick}> Delete </button>
      </div>
    </div>) : (<p className="center"> Loading... </p>);

    return (
      <div className="container">
        {post}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.postId;
  return {
    post: state.posts.find(post => post.id === id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => {
      dispatch(deletePost(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);