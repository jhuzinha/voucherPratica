
import { jest } from "@jest/globals";
import voucherRepository from "../../src/repositories/voucherRepository";
import {createVoucher} from '../../src/services/voucherService'
import {applyVoucher} from '../../src/services/voucherService'
import { generateCreateVoucher, randomAmount } from '../unit/voucherFactory'
import { conflictError } from '../../src/utils/errorUtils'

describe('',() => {
    it('create Voucher - 201 ', async () => {
        const voucher = await generateCreateVoucher()
        jest.spyOn(voucherRepository, 'getVoucherByCode').mockResolvedValueOnce(null)
        jest.spyOn(voucherRepository, 'createVoucher').mockResolvedValueOnce({
            ...voucher, 
            id: 1,
            used: true
        })
        await expect(createVoucher(voucher.code, voucher.discount)).resolves.not.toThrow()
        expect(voucherRepository.createVoucher).toHaveBeenCalled()
    })
    it('create Voucher - 409', async() => {
        const voucher = await generateCreateVoucher()
        jest.spyOn(voucherRepository, 'getVoucherByCode').mockResolvedValueOnce({
            ...voucher, 
            id: 1,
            used: true
        })
        expect(createVoucher(voucher.code, voucher.discount)).rejects.toStrictEqual(conflictError('Voucher already exist.'))
    })
    it('Aplly Voucher -  - ', async () => {
        const voucher = await generateCreateVoucher()
        const amount = await randomAmount()
        jest.spyOn(voucherRepository, 'getVoucherByCode').mockResolvedValueOnce({
            ...voucher, 
            id: 1,
            used: false
        })
        jest.spyOn(voucherRepository, 'useVoucher').mockResolvedValueOnce({
            ...voucher, 
            id: 1,
            used: true
        })
        await expect(applyVoucher(voucher.code, amount)).resolves.not.toThrow()
        

    })
    // it.todo('',() => {})
})