

export const userValidator = {
    firstName: {
        presence: true
    },
    lastName: {
        presence: true
    },
    birthDate: {
        datetime: {
        }
    },
    email: {
        presence: true,
        email: true
    },
    country: {
        presence: true
    },
    city: {
        presence: true
    }
};
