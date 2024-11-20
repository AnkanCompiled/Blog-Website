import React, { useEffect, useState } from "react";
import { UserNavComponent } from "../components/NavbarComponent";
import { contentDetailsApi, contentPostsApi } from "../api/contentApi";
import PostCardComponent from "../components/postCardComponent";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [postState, setPostState] = useState();
  useEffect(() => {
    document.title = "Home - BloggerNet";
    getPosts();
  }, []);

  async function getPostIds() {
    const result = await contentPostsApi();
    return result;
  }

  async function getDetails(user_id, post_id) {
    const postResult = await contentDetailsApi(user_id, post_id);
    return postResult;
  }

  async function getPosts() {
    const posts = await getPostIds();

    const postResults = await Promise.all(
      posts.map(async (post) => {
        return await getDetails(post.user_id, post.post_id);
      })
    );
    setPostState(postResults);
    setLoading(true);
  }

  return (
    <>
      <UserNavComponent />
      <div className="grid grid-cols-0 justify-center lg:grid-cols-2 xl:grid-cols-3 my-10 mx-5">
        {loading &&
          postState
            .slice()
            .reverse()
            .map((post, index) => (
              <PostCardComponent
                key={index}
                name={post.data.user}
                image={post.data.post.link}
                title={post.data.post.title}
                content={post.data.post.content}
              />
            ))}
      </div>
    </>
  );
}
