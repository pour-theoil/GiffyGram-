import { getDadJoke, getPosts, createPost, usePostCollection, getLoggedInUser } from "../data/DataManager.js"
import { PostList } from "./feed/postlist.js"
import { Joke } from "./dadjoke/joke.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"
import { PostEntry } from "./feed/postentry.js"

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

const showFilteredPosts = (year) => {
    debugger
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}



// eventlistener section, we have created the variable applicationElement that 
// will "listen" for diffent events happening in the .giffygram part of the page.
const applicationElement = document.querySelector(".giffygram");

document.getElementById("newjoke").onclick = function() {dadjokes()}

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {

        document.querySelector("input[name='postTitle']").value = ""
        document.querySelector("input[name='postURL']").value = "" 
        document.querySelector("textarea[name='postDescription']").value = ""
        //clear the input fields
    }
  })

  // Change Event for year
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
      console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})

// Ability to add new posts
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      const postObject = {
          title: title,
          imageURL: url,
          description: description,
          userId: getLoggedInUser().id,
          timestamp: Date.now()
      }
  
    // be sure to import from the DataManager
        createPost(postObject).then(startGiffyGram());
    }
    
  })

// Log if which edit button is clicked
applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

// Log which year has been requested
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
      console.log(`User wants to see posts since ${yearAsNumber}`)
      //invoke a filter function passing the year as an argument
      showFilteredPosts(yearAsNumber);
    }
})

// Execution functions
showNavBar();
dadjokes();
showFooter();
startGiffyGram();

const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
    
}
showPostEntry();


