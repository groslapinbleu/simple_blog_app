import React, { useState } from 'react';
export interface BlogPostInterface {
  title: string;
  content: string;
}

const sampleBlogPost1: BlogPostInterface = {
  title: 'Example blog post',
  content: 'Lorem Ipsum',
};

const sampleBlogPost2: BlogPostInterface = {
  title: 'Another example blog post',
  content: 'Lorem Ipsum tada',
};

const defaultBlog = [sampleBlogPost1, sampleBlogPost2];

const BlogContext = React.createContext({
  data: defaultBlog,
  addBlogPost: () => {},
});

export const BlogProvider = ({ children }: any) => {
  const [blogPosts, setBlogPosts] = useState(defaultBlog);
  const addBlogPost = () => {
    setBlogPosts([
      ...blogPosts,
      { title: `Blog post #${blogPosts.length + 1}`, content: 'Any content' },
    ]);
  };

  return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  );
};
export default BlogContext;
