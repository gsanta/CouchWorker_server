
export class RatingModel {
    private rating: number;

    constructor(rating: number) {
        this.rating = rating;
    }

    public getRating(): number {
        return this.rating;
    }
}