export abstract class ValidationError<T> {
    protected errorMessage: string;

    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    public getMessage(): string {
        return this.errorMessage;
    }
    
    public abstract setError(errorHolder: T): T;
}
