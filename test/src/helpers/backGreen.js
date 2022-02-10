export const backGreen = (importo) => {
    let pixel

    if (importo >= 35000) {

        pixel = 30

    } else if (importo >= 25000) {

        pixel = Math.round(importo / 600)

    } else if (importo >= 20000) {

        pixel = Math.round(importo / 450)

    } else if (importo >= 15000) {

        pixel = Math.round(importo / 300)

    } else if (importo >= 10000) {

        pixel = Math.round(importo / 160)

    } else if (importo >= 7000) {

        pixel = Math.round(importo / 110)

    } else if (importo >= 5000) {

        pixel = Math.round(importo / 80)

    } else if (importo >= 4000) {

        pixel = Math.round(importo / 70)

    } else if (importo >= 3000) {

        pixel = Math.round(importo / 35)

    } else if (importo >= 1000) {

        pixel = Math.round(importo / 30)

    } else if (importo >= 100) {

        pixel = Math.round(importo / 20)
    }

    return pixel
}