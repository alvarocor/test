const fetch = require("node-fetch");

export const getMonths = () => {

    return (async () => {

        const res = await fetch("http://localhost:3001/mesi", {
            method: 'GET'
        })

        const { status } = res

        if (status === 200) {
            return await res.json()
        } else if (status === 400 || status === 401) {
            const { error } = res.json()

            throw new Error(error)
        } else throw new Error('unknow error')
    })()
}