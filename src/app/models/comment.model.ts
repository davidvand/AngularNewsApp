import { Article } from './news.model';
import { User } from './user';

export class Comment {
    commentID: number;
    text: string;
    userID: number;
    articleID: number;
    user: User;


}