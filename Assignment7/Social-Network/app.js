class User {
    static idCounter = 1;
    constructor(username) {
        this.id = User.idCounter++;
        this.username = username;
    }
}

class Comment {
    static idCounter = 1;
    constructor(commenter, text) {
        this.id = Comment.idCounter++;
        this.commenter = commenter;
        this.text = text;
    }
}

class Post {
    static idCounter = 1;
    constructor(content, author) {
        this.id = Post.idCounter++;
        this.content = content;
        this.author = author;
        this.likes = [];
        this.comments = [];
        this.createdAt = new Date().toLocaleString();
    }

    like(user) {
        if (user.id !== this.author.id && !this.likes.find(u => u.id === user.id)) {
            this.likes.push(user);
        }
    }

    comment(user, text) {
        if (user.id !== this.author.id) {
            this.comments.push(new Comment(user, text));
        }
    }
}

// Utility functions
function randomUsername() {
    return 'user_' + Math.floor(Math.random() * 1000);
}

function randomSentence() {
    const sentences = [
        "This is awesome!", "Loving this app!", "What a great day!",
        "Coding is fun!", "Node.js rocks!", "Hello world!",
        "Check this out!", "Amazing stuff!", "Having fun!", "Great vibes!"
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function randomComment() {
    const comments = [
        "Nice post!", "I agree!", "Interesting thought.",
        "Haha, true!", "Well said!", "Exactly!", "Cool!", "Wow!"
    ];
    return comments[Math.floor(Math.random() * comments.length)];
}

//  Simulation 

// Step 1: Create users
const users = Array.from({ length: 10 }, () => new User(randomUsername()));

// Step 2: Create posts
const posts = users.map(user => new Post(randomSentence(), user));

// Step 3: Simulate interactions
posts.forEach(post => {
    const randomUsers = users.filter(u => u.id !== post.author.id);
    const likeUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    const commentUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];

    post.like(likeUser);
    post.comment(commentUser, randomComment());
});

// Step 4: Display output
console.log("📢 Users and Posts:");
users.forEach(user => {
    console.log(`\n👤 ${user.username} (id: ${user.id})`);
    const userPosts = posts.filter(p => p.author.id === user.id);
    userPosts.forEach(post => {
        console.log(`  📝 Post #${post.id}: "${post.content}"`);
        console.log(`     📅 Created At: ${post.createdAt}`);
        console.log(`     ❤️ Likes: ${post.likes.map(u => u.username).join(', ') || 'None'}`);
        console.log(`     💬 Comments:`);
        if (post.comments.length === 0) {
            console.log("        None");
        } else {
            post.comments.forEach(c => {
                console.log(`        - ${c.commenter.username}: "${c.text}"`);
            });
        }
    });
});
