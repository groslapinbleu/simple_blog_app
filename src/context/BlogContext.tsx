import createDataContext from './createDataContext';

interface BlogPostInterface {
  title: string;
  content: string;
}

interface ActionInterface {
  type: string;
}

const defaultBlogPosts: BlogPostInterface[] = [
  //   {
  //     title: 'Example blog post',
  //     content: 'Lorem Ipsum',
  //   },
  //   {
  //     title: 'Another example blog post',
  //     content: 'Lorem Ipsum tada',
  //   },
];

function blogReducer(blogPosts: BlogPostInterface[], action: ActionInterface) {
  switch (action.type) {
    case 'add_blogPost':
      return [
        ...blogPosts,
        { title: `Blog post #${blogPosts.length + 1}`, content: 'Any content' },
      ];
    default:
      throw new Error();
  }
}

const addBlogPost = (dispatch: Function) => {
  return () => {
    dispatch({ type: 'add_blogPost' });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost },
  defaultBlogPosts
);
