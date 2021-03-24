import { Post } from "./post.js";

export const PostList = (allPosts, userID) => {
	let postHTML = "";
		//Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
		for (const postObject of allPosts) {
			//what is a postObject?
			postHTML += Post(postObject, userID)
		}
		return postHTML;
	
}