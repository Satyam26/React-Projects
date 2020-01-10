import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Star from '../star.jpg';

class Home extends Component {
  state = {
    posts: []
  }
  componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      this.setState({
        posts: response.data.slice(0,10)
      })
    })
  }
  render() {

    const { posts } = this.state;
    const postsList = posts.length ? (
      posts.map(post => {
        return (
        <div className="post card" key={post.id}>
          <img src={Star} className="img-left" alt="a star"/>
          <div className="card-content">
            <Link to={'/' + post.id}>
            <span className="card-title red-text text-darken-3">{post.title}</span>
            </Link>
            <p>{post.body}</p>
          </div>
          <img src={Star} className="img-right" alt="a star"/>
        </div>)
      })
    ): (
      <p> You have no post </p>
    );

    return (
      <div className="container home">
        <h4 className="center">Home</h4>
        {postsList}
      </div>
    );
  }
}

export default Home;