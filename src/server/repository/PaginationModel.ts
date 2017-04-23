
export class PaginationModel {
    private page: number;
    private limit: number;

    constructor(page = 0, limit = 3) {
        this.page = page;
        this.limit = limit;
    }

    public getPage() {
        return this.page;
    }

    public getLimit() {
        return this.limit;
    }
}