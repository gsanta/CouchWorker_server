
export const loginValidator = {
    email: {
          presence: true,
          email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 5
        }
    }
}