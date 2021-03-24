export const Post = (postObject, userID) => {
    if (postObject.user.name === userID) {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <div><button id="edit__${postObject.id}">Edit</button><button id="delete__${postObject.id}">Delete</button><p>Posted by: You</p>
        </div>
      </section>
    `
    } else return`
    <section class="post">
      <header>
          <h2 class="post__title">${postObject.title}</h2>
      </header>
      <img class="post__image" src="${postObject.imageURL}" />
      <p>Posted by: ${postObject.user.name}
      </div>
    </section>
  `
  }