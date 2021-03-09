import { getDadJoke, getPosts } from "../data/DataManager.js"
import { PostList } from "./feed/postlist.js"
import { Joke } from "./dadjoke/joke.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"

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


const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("footer");
	navElement.innerHTML = Footer();
}
const dadjokes = () => {
    showDadJoke();
}

const startGiffyGram = () => {
	showPostList();
}

document.getElementById("newjoke").onclick = function() {dadjokes()}




// eventlistener section, we have created the variable applicationElement that 
// will "listen" for diffent events happening in the .giffygram part of the page.
const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
      console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})

applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

showNavBar();
dadjokes();
showFooter();
startGiffyGram();

