import { ArticleStatus } from './articlestatus.model';
import { Tag } from './tag.model';
import { User } from './user';

export class Article {

    
    articleID: number;
    title: string;
    subTitle: string;
    shortSummary: string;
    body: string;
    imageUrl: string;
    tagID: number;
    userID: number;
    articleStatusID: number;
    likes: number;
    user: User;
    tag: Tag;
    articleStatus: ArticleStatus;

}