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
let users = [];
let currentUser;

const createElement = (element) => document.createElement(element);

const createCommentDiv = (comment) => {
  const commentDiv = createElement("div");
  const commentContent = createElement("div");
  const image = createElement("img");
  const nameDiv = createElement("div");
  const name = createElement("p");
  const twitterVerified = createElement("img");
  const twitterIcon = createElement("img");
  const commentBody = createElement("p");
  const reactionDiv = createElement("div");
  const messageDiv = createElement("div");
  const commentIcon = createElement("img");
  const commentCount = createElement("p");
  const repostDiv = createElement("div");
  const repostIcon = createElement("img");
  const repostCount = createElement("p");
  const likeDiv = createElement("div");
  const likeIcon = createElement("img");
  const likeCount = createElement("p");

  commentDiv.classList.add("comment");
  image.setAttribute("src", "profile.jpeg");
  twitterVerified.setAttribute("src", "verify.png");
  twitterVerified.classList.add("icon");
  twitterIcon.setAttribute("src", "twitter.png");
  twitterIcon.classList.add("icon");
  commentContent.classList.add("comment-content");
  commentIcon.setAttribute("src", "message.png");
  commentIcon.classList.add("icon");
  repostIcon.setAttribute("src", "retweet.png");
  repostIcon.classList.add("icon");
  likeIcon.setAttribute("src", "heart.png");
  likeIcon.classList.add("icon");

  name.textContent = comment.name;
  commentBody.textContent = comment.body;
  commentCount.textContent = "0";
  repostCount.textContent = "0";
  likeCount.textContent = "0";

  commentContent.addEventListener("click", () => {
    fetchComments(comment.id);
  });

  commentDiv.appendChild(image);
  nameDiv.appendChild(name);
  nameDiv.appendChild(twitterVerified);
  nameDiv.appendChild(twitterIcon);
  commentContent.appendChild(nameDiv);
  commentContent.appendChild(commentBody);
  messageDiv.appendChild(commentIcon);
  messageDiv.appendChild(commentCount);
  repostDiv.appendChild(repostIcon);
  repostDiv.appendChild(repostCount);
  likeDiv.appendChild(likeIcon);
  likeDiv.appendChild(likeCount);
  reactionDiv.appendChild(messageDiv);
  reactionDiv.appendChild(repostDiv);
  reactionDiv.appendChild(likeDiv);
  commentContent.appendChild(reactionDiv);
  commentDiv.appendChild(commentContent);
  return commentDiv;
};

const displayComments = (comments) => {
  while (commentsDiv.firstElementChild) {
    commentsDiv.removeChild(commentsDiv.firstElementChild);
  }
  let commentsTitle = createElement("h3");
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
  } catch (e) {}
};

const createPostDiv = (post) => {
  const postDiv = createElement("div");
  const postContent = createElement("div");
  const image = createElement("img");
  const nameDiv = createElement("div");
  const name = createElement("p");
  const twitterVerified = createElement("img");
  const twitterIcon = createElement("img");
  const postTitle = createElement("p");
  const postBody = createElement("p");
  const reactionDiv = createElement("div");
  const commentDiv = createElement("div");
  const commentIcon = createElement("img");
  const commentCount = createElement("p");
  const repostDiv = createElement("div");
  const repostIcon = createElement("img");
  const repostCount = createElement("p");
  const likeDiv = createElement("div");
  const likeIcon = createElement("img");
  const likeCount = createElement("p");

  postDiv.classList.add("post");
  image.setAttribute("src", "profile.jpeg");
  twitterVerified.setAttribute("src", "verify.png");
  twitterVerified.classList.add("icon");
  twitterIcon.setAttribute("src", "twitter.png");
  twitterIcon.classList.add("icon");
  postTitle.classList.add("post-title");
  postContent.classList.add("post-content");
  commentIcon.setAttribute("src", "message.png");
  commentIcon.classList.add("icon");
  repostIcon.setAttribute("src", "retweet.png");
  repostIcon.classList.add("icon");
  likeIcon.setAttribute("src", "heart.png");
  likeIcon.classList.add("icon");

  name.textContent = currentUser.name;
  postTitle.textContent = post.title;
  postBody.textContent = post.body;
  commentCount.textContent = "200";
  repostCount.textContent = "200";
  likeCount.textContent = "200";

  postContent.addEventListener("click", () => {
    fetchComments(post.id);
  });

  postDiv.appendChild(image);
  nameDiv.appendChild(name);
  nameDiv.appendChild(twitterVerified);
  nameDiv.appendChild(twitterIcon);
  postContent.appendChild(nameDiv);
  postContent.appendChild(postTitle);
  postContent.appendChild(postBody);
  commentDiv.appendChild(commentIcon);
  commentDiv.appendChild(commentCount);
  repostDiv.appendChild(repostIcon);
  repostDiv.appendChild(repostCount);
  likeDiv.appendChild(likeIcon);
  likeDiv.appendChild(likeCount);
  reactionDiv.appendChild(commentDiv);
  reactionDiv.appendChild(repostDiv);
  reactionDiv.appendChild(likeDiv);
  postContent.appendChild(reactionDiv);
  postDiv.appendChild(postContent);
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
  fetchComments(posts[0].id);
};

const fetchPosts = async (id) => {
  try {
    const response = await fetch(`${POSTS_API}?userId=${id}`);
    const posts = await response.json();
    displayPosts(posts);
  } catch (e) {}
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

  image.setAttribute("src", "profile.jpeg");
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
  currentUser = user;
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
        }
      });
    });
    displayUser(users[0]);
  } catch (e) {}
};
fetchUsers();
