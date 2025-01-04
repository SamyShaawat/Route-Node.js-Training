import userModel from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";

const setupAssociations = () => {
    userModel.hasMany(Post, { foreignKey: "userId" });
    Post.belongsTo(userModel, { foreignKey: "userId" });

    Post.hasMany(Comment, { foreignKey: "postId" });
    Comment.belongsTo(Post, { foreignKey: "postId" });

    userModel.hasMany(Comment, { foreignKey: "userId" });
    Comment.belongsTo(userModel, { foreignKey: "userId" });
};

export default setupAssociations;
