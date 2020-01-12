const initState = {
  posts: [
    {id: '1', title: "title 1" , body: 'body 1'},
    {id: '2', title: "title 2" , body: 'body 2'},
    {id: '3', title: "title 3" , body: 'body 3'}
  ]
}

const rootReducer = (state = initState, action) => {

  if (action.type === 'DELETE_POST'){
    let updatedPost = state.posts.filter(post => {
      return post.id !== action.id
    })
    return {
      ...state,
      posts: updatedPost      
    }
  }
  else {
    return state;
  }

  
}



export default rootReducer;