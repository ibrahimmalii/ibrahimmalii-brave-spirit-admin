export interface User {
    getAllUsers: User[],
    getInactiveUsers: User[],
    showUser: {
        user: User,
        courses: [],
        subscriptions: []
    },
    addUser: void,
}
