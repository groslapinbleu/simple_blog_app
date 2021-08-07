import React, { useReducer } from 'react';
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

const BlogContext = React.createContext({
  data: defaultBlogPosts,
  addBlogPost: () => {},
});

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
export const BlogProvider = ({ children }: any) => {
  const [blogPosts, dispatch] = useReducer(blogReducer, defaultBlogPosts);
  const addBlogPost = () => {
    dispatch({ type: 'add_blogPost' });
  };
  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};
export default BlogContext;
