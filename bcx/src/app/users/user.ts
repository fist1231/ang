export class User {
    _id: string;
    id: string;
    name: string;
    status: string[];
    create_date: string;
    created_date: Date;

    constructor( id: string, name: string, status: string[], created_date: Date ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.created_date = created_date;
    }
}
