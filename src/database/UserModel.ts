
export class UserModel {
    private name: string;
    private age: number;
    private profession: string;

    constructor(name: string, age: number, profession: string) {
        this.name = name;
        this.age = age;
        this.profession = profession;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public getProfession(): string {
        return this.profession;
    }
}
