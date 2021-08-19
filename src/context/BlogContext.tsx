import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

export interface BlogPostInterface {
  id: number;
  title: string;
  content: string;
}

interface ActionInterface {
  type: string;
  payload: BlogPostInterface;
}

const defaultBlogPosts: BlogPostInterface[] = [];

function blogReducer(blogPosts: BlogPostInterface[], action: ActionInterface) {
  console.log('blogReducer : type = ' + action.type);
  switch (action.type) {

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
    case 'get_blogPosts':
      return action.payload;
    default:
      throw new Error();
  }
}

const getBlogPosts = (dispatch: Function) => {
  return async () => {
    try {
      const response = await jsonServer.get('blogposts');
      dispatch({ type: 'get_blogPosts', payload: response.data });
    } catch (e) {
      console.log(e)
    }

  };
};

const addBlogPost = (dispatch: Function) => {
  return async (post: BlogPostInterface, callback: Function) => {
    try {
      await jsonServer.post('/blogposts', { title: post.title, content: post.content })
      if (callback) callback();
    } catch (e) {
      console.log(e)
    }
  };
};
const editBlogPost = (dispatch: Function) => {
  return async (post: BlogPostInterface, callback: Function) => {

    try {
      await jsonServer.put(`/blogposts/${post.id}`, post)
      dispatch({ type: 'edit_blogPost', payload: post });
      if (callback) callback();
    }
    catch (e) {
      console.log(e)
    }
  };
};
const delBlogPost = (dispatch: Function) => {
  return async (id: number) => {
    try {
      await jsonServer.delete(`/blogposts/${id}`)
      dispatch({ type: 'del_blogPost', payload: { id } });

    } catch (e) {
      console.log(e)
    }
  };
};
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, delBlogPost, editBlogPost, getBlogPosts },
  defaultBlogPosts
);
