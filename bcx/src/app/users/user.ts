export class User {
    _id: string;
    id: string;
    name: string;
    desc: string;
    create_date: string;
    created_date: string;

    constructor( id: string, name: string ) {
        this.id = id;
        this.name = name;
    }
}
