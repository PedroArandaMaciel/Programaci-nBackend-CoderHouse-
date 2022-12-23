import { faker } from "@faker-js/faker";

faker.locale = 'es';

export const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        image: faker.image.avatar()
    }
}