export class Optional<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public ifPresent(func: (value: T) => void) {
        if (this.isPresent()) {
            func(this.value);        
        }

        return this;
    }

    public ifNotPresent(func: (value: T) => void) {
        if (!this.isPresent()) {
            func(this.value);        
        }

        return this;
    }

    public isPresent(): boolean {
        return this.value !== null && this.value !== undefined;
    }

    public getValue(): T {
        return this.value;
    }
}