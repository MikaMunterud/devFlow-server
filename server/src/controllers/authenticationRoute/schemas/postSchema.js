const postSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  username: {
      type: String,
      required: true
  },
  
  post: {
      type: String,
      required: true
  },
  likes: {
      type: Array,
      default: []
  },
  comments: [{
      comment: {
          type: String,
          required: true
      },
      username: {
          type: String,
          required: true
      },
     
  }],
  createdAtDate: {
      type: String,
      required: true
  }
},{ strict: "throw" })
const Post = mongoose.model('Post', postSchema);