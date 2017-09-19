export class ResponseBean {
    code: number;
    message: string;
    body: any;

    constructor(code: number, message: string, body: any) {
        this.code = code;
        this.message = message;
        this.body = body;
    }
}
