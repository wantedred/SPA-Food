import { UserSubmittedPhoto } from './user-submitted-photo';

export interface RecipeReview {
    comment: string;
    rating: number;
    photos: UserSubmittedPhoto[];
}