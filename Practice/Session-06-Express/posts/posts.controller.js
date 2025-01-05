let posts = [
    { id: 1, title: "title1", desc: "body1" },
    { id: 2, title: "title2", desc: "body2" },
    { id: 3, title: "title3", desc: "body3" },
    { id: 4, title: "title4", desc: "body4" },
    { id: 5, title: "title5", desc: "body5" },
]

let getPosts = (req, res, next) => {
    res.status(200).send({ msg: "done", posts });
}

let addPost = (req, res, next) => {
    const { id, title, desc } = req.body;
    let index = posts.findIndex(post => post.id == id);
    if (index == -1) {
        posts.push({ id, title, desc });
        return res.status(201).json({ msg: "Post added Successfully", posts });
    }
    return res.status(409).json({ msg: "Post with this id already exists" });
}

let updatePost = (req, res, next) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    let index = posts.findIndex(post => post.id == id);
    if (index == -1) {
        return res.status(409).json({ msg: "Post not exists" });
    }
    posts[index].title = title;
    posts[index].desc = desc;
    return res.status(201).json({ msg: "Post updated Successfully", post: posts[index] });

}

let deletePost = (req, res, next) => {
    const { id } = req.params;
    let index = posts.findIndex(post => post.id == id);
    if (index == -1) {
        return res.status(409).json({ msg: "Post not exists" });
    }
    posts.splice(index, 1)
    return res.status(201).json({ msg: "Post deleted", posts });
}
module.exports = {
    getPosts,
    addPost,
    updatePost,
    deletePost
}