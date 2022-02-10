const { expect } = require('chai')
const getMonths = require('./getMonths')

describe('getMonths', () => {

    it('Should succed when data.json have data', async () => {

        const gennaio = {
            mese: "Gennaio",
            documenti: 32,
            importo: 26361
        }
        
        const months = await getMonths()

        expect(months).to.exist
        expect(months[0].mese).to.equal(gennaio.mese)
        expect(months[0].documenti).to.equal(gennaio.documenti)
        expect(months[0].importo).to.equal(gennaio.importo)
    })
})
