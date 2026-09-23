import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',        // User model se link
      required: true,
    },
  },
  { timestamps: true }     // createdAt, updatedAt auto add ho jayega
);

export default mongoose.model('Post', postSchema);
