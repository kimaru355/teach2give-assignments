const postsComments = document.querySelector("#postsComments");
const userWrapper = document.querySelector("#current-user-wrapper");
const postsDiv = document.querySelector("#posts");
const commentsDiv = document.querySelector("#comments");
const selectUser = document.querySelector("#users");

const USERS_API = "https://jsonplaceholder.typicode.com/users";
const POSTS_API = "https://jsonplaceholder.typicode.com/posts";
const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments";
const POST_API = "https://jsonplaceholder.typicode.com/posts?userId=1";
const COMMENT_API = "https://jsonplaceholder.typicode.com/comments?postId=1";
const IMAGE_URL =
  "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg";
const TWITTER_VERIFIED =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVqwoWz4tLDHFi5hnTlSPMUX4bAywnBYlUoA36Gt2mg&s";
let users = [];

const createElement = (element) => document.createElement(element);

const createCommentDiv = (comment) => {
  const commentDiv = createElement("div");
  const image = createElement("img");
  const NameDiv = createElement("div");
  const name = createElement("p");
  const twitterVerified = createElement("img");
  const twitterIcon = createElement("ion-icon");
  const commentName = createElement("p");
  const commentBody = createElement("p");

  twitterIcon.setAttribute("name", "logo-twitter");
  commentDiv.classList.add("comment");

  commentDiv.addEventListener("click", () => {
    const comments = fetchComments(comment.id);
    displayComments(comments);
  });

  commentName.textContent = comment.name;
  commentBody.textContent = comment.body;

  commentDiv.appendChild(commentName);
  commentDiv.appendChild(commentBody);
  return commentDiv;
};

const displayComments = (comments) => {
  while (commentsDiv.firstElementChild) {
    commentsDiv.removeChild(commentsDiv.firstElementChild);
  }
  let commentsTitle = createElement("h2");
  commentsTitle.textContent = `Post ${comments[0].postId} Comments`;
  commentsDiv.appendChild(commentsTitle);
  comments.map((comment) => {
    const commentDiv = createCommentDiv(comment);
    commentsDiv.appendChild(commentDiv);
  });
};

const fetchComments = async (postId) => {
  try {
    const response = await fetch(`${COMMENTS_API}?postId=${postId}`);
    const comments = await response.json();
    displayComments(comments);
  } catch (e) {
    console.log("Error fetching comments");
    console.error(e);
  }
};

const createPostDiv = (post) => {
  const postDiv = createElement("div");
  const image = createElement("img");
  const NameDiv = createElement("div");
  const name = createElement("p");
  const twitterVerified = createElement("img");
  const twitterIcon = createElement("ion-icon");
  const postTitle = createElement("p");
  const postBody = createElement("p");

  twitterIcon.setAttribute("name", "logo-twitter");
  postDiv.classList.add("post");

  postDiv.addEventListener("click", () => {
    fetchComments(post.id);
  });

  postTitle.textContent = post.title;
  postBody.textContent = post.body;

  postDiv.appendChild(postTitle);
  postDiv.appendChild(postBody);
  return postDiv;
};

const displayPosts = (posts) => {
  while (postsDiv.firstElementChild) {
    postsDiv.removeChild(postsDiv.firstElementChild);
  }
  let postTitle = createElement("h2");
  postTitle.textContent = "Posts";
  postsDiv.appendChild(postTitle);
  posts.map((post) => {
    const postDiv = createPostDiv(post);
    postsDiv.appendChild(postDiv);
  });
};

const fetchPosts = async (id) => {
  try {
    const response = await fetch(`${POSTS_API}?userId=${id}`);
    const posts = await response.json();
    displayPosts(posts);
  } catch (e) {
    console.log("Failed to fetch posts");
    console.error(e);
  }
};

const displayUser = (user) => {
  while (userWrapper.firstElementChild) {
    userWrapper.removeChild(userWrapper.firstElementChild);
  }
  const userDiv = createElement("div");
  const image = createElement("img");
  const name = createElement("h2");
  const userName = createElement("p");
  const website = createElement("p");
  const companyCatchPhrase = createElement("p");
  const locationDiv = createElement("div");
  const locationIcon = createElement("ion-icon");
  const locationName = createElement("p");

  image.setAttribute("src", IMAGE_URL);
  userDiv.setAttribute("id", "current-user");
  locationIcon.setAttribute("name", "location-sharp");

  name.textContent = user.name;
  userName.textContent = "@" + user.username;
  website.textContent = user.website;
  companyCatchPhrase.textContent = user.company.catchPhrase;
  locationName.textContent = user.address.city;

  locationDiv.appendChild(locationIcon);
  locationDiv.appendChild(locationName);
  userDiv.appendChild(image);
  userDiv.appendChild(name);
  userDiv.appendChild(userName);
  userDiv.appendChild(website);
  userDiv.appendChild(companyCatchPhrase);
  userDiv.appendChild(locationDiv);
  userWrapper.appendChild(userDiv);
  fetchPosts(user.id);
};

const fetchUsers = async () => {
  try {
    const response = await fetch(USERS_API);
    users = await response.json();
    users.map((user) => {
      const option = createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      selectUser.appendChild(option);
    });
    selectUser.addEventListener("change", (event) => {
      const id = +event.target.value;
      users.map((user) => {
        if (user.id === id) {
          displayUser(user);
          while (commentsDiv.firstElementChild) {
            commentsDiv.removeChild(commentsDiv.firstElementChild);
          }
        }
      });
    });
    displayUser(users[0]);
  } catch (e) {
    console.log("Error fetching users");
    console.error(e);
  }
};
fetchUsers();
