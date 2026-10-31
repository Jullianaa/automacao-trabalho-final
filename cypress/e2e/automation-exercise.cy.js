/// <reference types= "cypress" />

import {faker} from '@faker-js/faker'

describe('Automation Exercise', () => {
    const password = '123456';

    const createUserData = () => {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        return{
            name: `${firstName}` `${lastName}`,
            email: `automation-${faker.string.uuid()}@mail.com`,
        }
    }
});