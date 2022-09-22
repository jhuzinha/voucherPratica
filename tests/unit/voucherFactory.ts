import { VoucherCreateData, VoucherApplyData } from "../../src/services/voucherService";
import { faker } from '@faker-js/faker';

export async function generateCreateVoucher(){
    return {
        code: faker.random.word(),
        discount: faker.datatype.number({max: 100})
    }
}

export async function randomAmount() {
    return faker.datatype.number({min: 100})
}