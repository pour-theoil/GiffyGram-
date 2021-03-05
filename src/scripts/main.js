import { getDadJoke, getPosts } from "../data/DataManager.js"
import { PostList } from "./feed/postlist.js"
import { Joke } from "./dadjoke/joke.js"

const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {
          postElement.innerHTML = PostList(allPosts);
      })
}

const showDadJoke = () => {
    const postElement = document.querySelector(".dadjoke");
      getDadJoke().then((joke) => {
          postElement.innerHTML = Joke(joke);
      })
}
const startGiffyGram = () => {
	showPostList();
}

const dadjokes = () => {
    showDadJoke();
}

dadjokes();


document.getElementById("newjoke").onclick = function() {dadjokes()}
// Are you defining the function here or invoking it?
startGiffyGram();

// applicationElement.addEventListener("click", event => {
// 	if (event.target.id === "newdadjoke"){
// 		newdadjoke();
// 	}
// })