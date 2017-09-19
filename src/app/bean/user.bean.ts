export class UserBean {
    username: string;
    name: string;
    password: string;
    type: number;
    image: string;

    constructor(username: string, name: string, password: string, type: number, image: string) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.type = type;
        this.image = image;
    }
}
