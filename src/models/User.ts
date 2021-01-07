import axios, { AxiosResponse } from "axios"

interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

type Callback = () => void

export class User {

    event: { [event: string]: Callback[] } = {}

    constructor(private data: UserProps) { }

    get(propName: string): (string | number) {
        return this.data[propName]
    }

    set(update: Partial<UserProps>) {
        Object.assign(this.data, update)
    }

    on(eventName: string, callback: Callback): void {
        const handler = this.event[eventName] || [];
        handler.push(callback);
        this.event[eventName] = handler;
    }

    trigger(eventName: string): void {
        const handler = this.event[eventName]

        if (!handler || handler.length == 0) {
            return;
        }

        handler.forEach(callback => callback())
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data)
            })
    }

    save(): void {
        const id = this.get('id')

        if (id) {
            axios.put(`http://localhost:3000/users/${id}`, this.data)
        } else {
            axios.post(`http://localhost:3000/users`, this.data)
        }
    }

}