import { Post } from "./post";

export interface PostComment {
  post: Post;
  postID: string;
  postComment: string;
  commentAuthor: string;
  commentAuthorImage: string;
  commentDate: string;
}
