export class ClientBean {
    name: string;
    status: string;
    sex: number;
    age: number;
    profession: string;

    constructor(name: string, status: string, sex: number, age: number, profession: string) {
        this.name = name;
        this.status = status;
        this.sex = sex;
        this.age = age;
        this.profession = profession;
    }
}
