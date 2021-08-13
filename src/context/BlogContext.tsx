import createDataContext from './createDataContext';

export interface BlogPostInterface {
  id: number;
  title: string;
  content: string;
}

interface ActionInterface {
  type: string;
  payload: BlogPostInterface;
}

const defaultBlogPosts: BlogPostInterface[] = [
  {
    id: 1,
    title: 'a title',
    content: 'some content',
  },
];

function blogReducer(blogPosts: BlogPostInterface[], action: ActionInterface) {
  console.log('blogReducer : type = ' + action.type);
  console.log('blogReducer : payload = ' + action.payload);

  switch (action.type) {
    case 'add_blogPost':
      return [...blogPosts, action.payload];
    case 'del_blogPost':
      // remove element
      return blogPosts.filter((value) => {
        return value.id !== action.payload.id;
      });
    case 'edit_blogPost':
      const newBlogPosts = [...blogPosts];
      const updatedPost = newBlogPosts.find((element) => {
        return element.id === action.payload.id;
      });
      if (updatedPost) {
        // Modify object property
        updatedPost.title = action.payload.title;
        updatedPost.content = action.payload.content;
      }
      return newBlogPosts;
    default:
      throw new Error();
  }
}

const addBlogPost = (dispatch: Function) => {
  return (post: BlogPostInterface, callback: Function) => {
    dispatch({ type: 'add_blogPost', payload: post });
    callback();
  };
};
const editBlogPost = (dispatch: Function) => {
  return (post: BlogPostInterface, callback: Function) => {
    dispatch({ type: 'edit_blogPost', payload: post });
    callback();
  };
};
const delBlogPost = (dispatch: Function) => {
  return (id: number) => {
    dispatch({ type: 'del_blogPost', payload: { id } });
  };
};
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, delBlogPost, editBlogPost },
  defaultBlogPosts
);
