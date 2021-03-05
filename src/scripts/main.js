import { getUsers, getPosts } from "../data/DataManager.js"
import { PostList } from "./feed/postlist.js"


const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {
          postElement.innerHTML = PostList(allPosts);
      })
}

const startGiffyGram = () => {
	showPostList();
}

// Are you defining the function here or invoking it?
startGiffyGram();

