var posts = new Database("posts");
let commentBox = document.getElementById("posts");

/* BUGFIX
 შემდეგი ორი ფუნქცია გამორჩენილი იყო საწყის 
 კოდში (გამოქვეყნებისას) 
 შეცვლილია: 8 იანვარი 22:00
 თუ ამ თარიღის შემდეგ გააკეთეთ fork, უბრალოდ წაშალეთ ეს კომენტარი
 თუ ამ თარიღამდე დაიწყეთ, გადააკოპირეთ ეს ორი ფუნქცია
 თქვენს ფაილში.
*/
function setUser(username) {
    localStorage.setItem("currentUser", username);
    document.getElementById("username").value = username;
}

function displayAllPosts() {
    var allPosts = posts.getAll();
    allPosts.sort(function (post1, post2) {
        return post1.likes.length - post2.likes.length;
    });
    for (let post of allPosts) {
        var elem = createPost(post);
        addNewPost(elem);
    }
    // ეს ხაზი აუცილებელია news feed ტესტერისთვის
    return allPosts;
}

displayAllPosts();

function newPost() {
    let postInput = getPostText();

    if (!postInput) {
        return;
    }
    var post = posts.create({
        text: getPostText(),
        user: getUser(),
        likes: [],
    });

    var elem = createPost(post);
    addNewPost(elem);

    let newComment = document.querySelector(".new_comment");
    newComment.setAttribute("onclick", "commentOnPost(this)");
}

function deleteComment(el) {
  el.remove()
}

function commentOnPost(btn) {

    let getInput = btn.previousElementSibling
    let feed = btn.nextElementSibling
    
    let commentDivText = document.createElement("div");
    commentDivText.innerText = getInput.value;
    commentDivText.classList.add("comment_text");
    
    let commentBox = document.createElement("div");
    commentBox.classList.add("comment_container");

    let removeCommentBtn = document.createElement("button");
    removeCommentBtn.classList.add("delete_comment");
    removeCommentBtn.innerText = "Delete Comment";

    commentBox.appendChild(commentDivText);
    commentBox.appendChild(removeCommentBtn);
    feed.appendChild(commentBox);
    getInput.value = "";

    removeCommentBtn.setAttribute("onclick", `deleteComment(this.parentElement)`);
}

function getPostText() {
    var postInputElement = document.getElementById("post_text");
    return postInputElement.value;
}

function getUser() {
    return localStorage.getItem("currentUser") || "unknown user";
}

function deletePost(postId) {
    var postElem = document.getElementById(`post-${postId}`);
    postElem.parentNode.removeChild(postElem);
    posts.delete(postId);
}

commentBox.innerHTML = "";

function createPost(post) {
    return `
		<div id="post-${post.id}" class="post container">
			<div>
				<button class="post_delete_button" onclick="deletePost(${post.id})">
					delete
				</button>
			</div>
			<div class="post_title">${post.user}</div>
			<div class="post_text">${post.text}</div>
			${createPostLikes(post)}
      ${createCommentSection()}
    </div>
    `
}

function createPostLikes(post) {
    return `
		<div class="post_likes_container">
			<div class="post_likes_info">
				<span class="post_likes_count">
					${post.likes.length > 0 ? post.likes.length : ""}
				</span> 
				<span class="post_likes_text">
          ${post.likes.length > 0 ? "likes" : ""}
				</span>
			</div>
			<button class="post_like_button" onclick="newLike(${post.id})">
				like
			</button>
		</div>
	`;
}


function createCommentSection(){
  return `
  <div class="comments_container">
    <textarea class="comment_input_text"></textarea>
    <button class="new_comment">Add Comment</button>
    <div class="comments_feed"></div>
  </div> 
  `
}

function showLikesCount(post) {
    return post.likes.length > 0 ? post.likes.length : "";
}

function showLikesText(post) {
    return post.likes.length > 0 ? "likes" : "";
}

function newLike(postId) {
    var post = posts.getById(postId);
    var user = getUser();
    if (!post.likes.includes(user)) {
        post.likes.push(user);
    }
    posts.update(post);
    addNewLike(post);
}

function addNewLike(post) {
    var postElem = document.getElementById(`post-${post.id}`);
    var postLikesCountElem = postElem.querySelector("span.post_likes_count");
    postLikesCountElem.innerText =
        post.likes.length > 0 ? post.likes.length : "";

    var postLikesTxt = postElem.querySelector("span.post_likes_text");
    postLikesTxt.innerText = post.likes.length > 0 ? "likes" : "";
}

function addNewPost(elem) {
    var posts = document.getElementById("posts");
    posts.insertAdjacentHTML("afterbegin", elem);
    let postTxt = document.getElementById("post_text");
    postTxt.value = "";
}

// დამატებითი ფუნქციონალი აქედან იწყება

let categoryBtn = document.querySelector('.categoryBtn')
let body = document.querySelector('body')
const showMore = document.getElementById("showMore");
let commentBtn = document.querySelector('.commentArrowIcon')
let app = document.getElementById('app')
let arrowBox= document.querySelector('.commentArrow')

categoryBtn.addEventListener('click', () => {
  body.classList.toggle('showCategory')
})

let pageCounter = 1

const getTvShows = async () => {
  const response = await axios.get(
    `https://api.tvmaze.com/shows?page=${pageCounter}`
  );
  let tvshows = response.data;

  for (let i = 0; i < 21; i++) {
    const li = document.createElement("li");

    li.innerHTML = `
            <h2>${tvshows[i].name}</h2>
            <img src="${tvshows[i].image.medium}" alt="${tvshows[i].name} poster">
        `;
    tvshowsUL.appendChild(li);

    li.addEventListener('click', () => {
      window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    })
  }
  pageCounter++;
}

getTvShows()

showMore.addEventListener("click", () => {
  getTvShows();
});

commentBtn.addEventListener('click', () => {
  console.log('btn')
  arrowBox.classList.toggle('showComments')
  commentBtn.classList.toggle('showComments')
  app.classList.toggle('showComments')
})






















window.newPost = newPost;
window.newLike = newLike;
window.deletePost = deletePost;