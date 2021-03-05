export const Joke = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">Dad Joke</h2>
            <p>${postObject.joke}</p>
        </header>
      </section>
    `
  }