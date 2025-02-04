import postModel from "../model/postModel.js";

export const uploadDb = async (data) => {
  const newPost = new postModel(data);
  const result = await newPost.save();
  return result;
};

export const fetchPostDb = async (skip, limit) => {
  const result = await postModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "author",
      select: "username _id profilePicture",
    })
    .lean();
  return result;
};

export const likeDb = async (userId, postId, value) => {
  const update = value
    ? { $addToSet: { likes: userId } }
    : { $pull: { likes: userId } };
  await postModel.findByIdAndUpdate(postId, update);
};

export const addCommentToPost = async (postId, commentId) => {
  const post = await postModel.findById(postId);
  post.comments.push(commentId);
  await post.save();
};

export const fetchCommentsDb = async (id) => {
  const post = await postModel
    .findById(id, {
      comments: 1,
      _id: 0,
    })
    .populate({
      path: "comments",
      populate: [
        {
          path: "user",
          select: "username _id profilePicture",
        },
      ],
    })
    .lean();

  return post ? post.comments : [];
};

// export const fetchCommentsDb = async (id, userId, page = 1, limit = 100) => {
//   // Step 1: Fetch Top 100 Comments sorted by score (likes) directly from MongoDB
//   const topComments = await postModel
//     .findById(id, {
//       comments: 1,
//       _id: 0,
//     })
//     .populate({
//       path: "comments",
//       match: { score: { $gt: 0 } }, // Only fetch comments with score greater than 0
//       options: {
//         sort: { score: -1 }, // Sort by score (likes) descending
//         limit, // Limit the number of top comments
//         skip: (page - 1) * limit, // Pagination
//       },
//       populate: {
//         path: "user",
//         select: "username _id profilePicture",
//       },
//     })
//     .lean();

//   // If post or comments not found
//   if (!topComments || !topComments.comments) {
//     return { topComments: [], recentComments: [] };
//   }

//   const topCommentsList = topComments.comments;

//   // Step 2: Fetch Recent Comments from the user within the last 7 days
//   const recentComments = await postModel
//     .findById(id, {
//       comments: 1,
//       _id: 0,
//     })
//     .populate({
//       path: "comments",
//       match: {
//         user: userId, // Match comments by the userId
//         createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Only comments from last 7 days
//       },
//       populate: {
//         path: "user",
//         select: "username _id profilePicture",
//       },
//     })
//     .lean();

//   // If recent comments are found
//   const recentCommentsList = recentComments?.comments || [];

//   // Step 3: Filter out any overlapping comments
//   const filteredTopComments = topCommentsList.filter(
//     (topComment) =>
//       !recentCommentsList.some(
//         (recentComment) => recentComment._id.toString() === topComment._id.toString()
//       )
//   );

//   // Return the results
//   return { topComments: filteredTopComments, recentComments: recentCommentsList };
// };
