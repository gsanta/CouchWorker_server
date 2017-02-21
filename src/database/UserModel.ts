
export class UserModel {
    private name: string;
    private age: number;
    private profession: string;
    private email: string
    private uuid: string;

    constructor(name: string, age: number, profession: string, email: string, uuid?: string) {
        this.name = name;
        this.age = age;
        this.profession = profession;
        this.email = email;
        this.uuid = uuid;
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

    public getEmail(): string {
        return this.email;
    }

    public getUuid(): string {
        return this.uuid;
    }
}
