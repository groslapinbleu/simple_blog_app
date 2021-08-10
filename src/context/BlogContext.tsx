import createDataContext from './createDataContext';

interface BlogPostInterface {
  id: number;
  title: string;
  content: string;
}

interface ActionInterface {
  type: string;
  payload?: number; // not used for a create, that's why is is optional
}

const defaultBlogPosts: BlogPostInterface[] = [];

function blogReducer(blogPosts: BlogPostInterface[], action: ActionInterface) {
  switch (action.type) {
    case 'add_blogPost':
      return [
        ...blogPosts,
        {
          id: Math.floor(Math.random() * 99999),
          title: `Blog post #${blogPosts.length + 1}`,
          content: 'Any content',
        },
      ];
    case 'del_blogPost':
      // remove element
      return blogPosts.filter((value) => {
        return value.id !== action.payload;
      });
    default:
      throw new Error();
  }
}

const addBlogPost = (dispatch: Function) => {
  return () => {
    dispatch({ type: 'add_blogPost' });
  };
};
const delBlogPost = (dispatch: Function) => {
  return (id: number) => {
    dispatch({ type: 'del_blogPost', payload: id });
  };
};
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, delBlogPost },
  defaultBlogPosts
);
