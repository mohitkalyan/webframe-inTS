import { User } from "./models/User"

const user = new User({ 'id': 2 })

user.set({ name: 'MY NAME', age: 9999 })
user.save()