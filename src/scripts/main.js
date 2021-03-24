import { deletePost, getDadJoke, getPosts, createPost, 
    usePostCollection, getLoggedInUser, registerUser, loginUser, logoutUser } from "../data/DataManager.js"
import { PostList } from "./feed/postlist.js"
import { Joke } from "./dadjoke/joke.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer/footer.js"
import { PostEntry } from "./feed/postentry.js"
import { LoginForm } from "./auth/Login.js"
import { RegisterForm } from "./auth/RigisterForm.js"


const applicationElement = document.querySelector(".giffygram");
const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {
          postElement.innerHTML = PostList(allPosts, userObject.name);
      })
}

const showDadJoke = () => {
    const postElement = document.querySelector(".dadjoke");
      getDadJoke().then((joke) => {
          postElement.innerHTML = Joke(joke);
      })
}

applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
  }
})

const checkForUser = () => {
  	if (sessionStorage.getItem("user")){
		  setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    	startGiffyGram();
  	}else {
   		showLoginRegister();
  	}
}

const showLoginRegister = () => {
  	showNavBar();
  	const entryElement = document.querySelector(".entryForm");
  	//template strings can be used here too
  	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
  	//make sure the post list is cleared out too
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}
let userObject = {};
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)
    .then(dbUserObj => {
      if(dbUserObj){
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      }else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    })
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value
    }
    registerUser(userObject)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    })
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
    sessionStorage.clear();
    checkForUser();
  }
})

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
  showPostEntry ();
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


document.getElementById("newjoke").onclick = function() {dadjokes()}


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

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
      const postId = event.target.id.split("__")[1];
      deletePost(postId)
        .then(response => {
          showPostList();
        })
    }
  })

// Execution functions

dadjokes();
showFooter();
showLoginRegister()

const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
    
}
deletePost();


