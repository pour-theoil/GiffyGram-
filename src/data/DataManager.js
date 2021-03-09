
export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    // .then(parsedResponse => {
    //     // do something with response here
    //     return parsedResponse;
    // })
}

export const getPosts = () => {

    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    // .then(parsedResponse => {
    //     // do something with response here
    //     return parsedResponse;
    // })
}

export const getDadJoke = () => {

    return fetch('https://icanhazdadjoke.com/', {
        method: 'Get',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())
    // .then(parsedResponse => {
    //     // do something with response here
    //     return parsedResponse;
    // })
}

export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
  }
const loggedInUser = {
	id: 1,
	name: "Logan",
	email: "Logan@email.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}