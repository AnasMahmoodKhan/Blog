import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

import "../styles/blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=95459e2da4c05747140930720b0932c9`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {});
  }, [blog_url, dispatch]);

  let noBlog = (
    <h1 className="no__blogs">
      No blogs available 😞. Search something else to read blogs on the greatest
      platform.
    </h1>
  );

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading && <h1 className="loading">Loading...</h1>}
      {blogs ? (
        <div className="blogs">
          {blogs.articles
            ? blogs.articles.map(
                ({ image, source, publishedAt, title, description, url }) => (
                  <a className="blog" target="blank" href={url}>
                    <img src={image} alt="..." />
                    <div>
                      <h3 className="sourceName">
                        <span>{source.name}</span>
                        <p>{publishedAt}</p>
                      </h3>
                      <h1>{title}</h1>
                      <p>{description}</p>
                    </div>
                  </a>
                )
              )
            : noBlog}

          {blogs.totalArticles === 0 && noBlog}
        </div>
      ) : (
        noBlog
      )}
    </div>
  );
};

export default Blogs;
