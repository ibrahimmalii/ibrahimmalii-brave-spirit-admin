export class User {
    private firstname: string;
    private lastname: string;
    private email: string;
    private phone: string;
    private password: string;
    private birthdate: string | undefined;
    private country: string | undefined;
    private gender: number | undefined;
    constructor(
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
        password: string,
        birthdate?: string,
        country?: string,
        gender?: number
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.birthdate = birthdate;
        this.country = country;
        this.gender = gender;
    }
}
