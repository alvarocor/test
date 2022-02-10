import React from 'react'
import { useState, useEffect } from 'react'
import { getMonths } from './logic/getMonths'
import { backGreen } from './helpers/backGreen'


function App() {

    const [months, setMonths] = useState([])
    const [monthsData, setMonthsData] = useState([])
    const [cursorPos, setCursorPos] = useState({
        event: null,
        moving: false,
        mousedown: false,
    })

    useEffect(() => {
        (async function () {
            const months = await getMonths()

            setMonthsData(months)

        })()
    }, [])

    const handleMouseDown = (e, id) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.target.id === id) {
            setCursorPos({
                ...cursorPos,
                mousedown: true,
                event: e,
            })
            setMonths([e.target.id])
        }
        if (e.nativeEvent.path[2].id === id) {
            setCursorPos({
                ...cursorPos,
                mousedown: true,
                event: e,
            })
            setMonths([e.nativeEvent.path[2].id])
        }
    }

    const handleMouseMove = (e) => {

        if (cursorPos.mousedown === true) {

            let arr = months

            if (e.target.id !== '' && !months.includes(e.target.id) && !months.includes(e.nativeEvent.path[2].id)) {

                arr.push(e.target.id)

                setMonths(arr)
            }
            if (e.nativeEvent.path[2].id !== '' && !months.includes(e.target.id) && !months.includes(e.nativeEvent.path[2].id)) {

                arr.push(e.nativeEvent.path[2].id)

                setMonths(arr)
            }
        }
    }

    const handleMouseUp = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setCursorPos({
            ...cursorPos,
            mousedown: false,
            moving: false,
            event: e,
        })
    }

    const clicked = (month) => {
        setMonths(month)
    }

    let countLeft = 0
    let countOrder = 0
    let dividerLeft = 1
    let dividerOrder = 1
    let backLeft = 1

    return monthsData ?
        <div className='tab'>
            {
                monthsData.map(({ mese, documenti, importo }) =>

                    <><div className='divider' key={mese} style={{
                        left: `${(dividerLeft === 1 ? (dividerLeft = 0) + 'px' : (dividerLeft = dividerLeft + 81) + 'px')}`,
                        order: `${(dividerOrder === 1 ? dividerOrder = 0 : dividerOrder = dividerOrder + 2)}`
                    }}></div>

                        <div className='month' id={`${mese}`} style={{
                            left: `${(countLeft === 0 ? (countLeft = countLeft + 1) + 'px' : (countLeft = countLeft + 81) + 'px')}`,
                            order: `${countOrder === 0 ? countOrder = countOrder + 1 : countOrder = countOrder + 2}`
                        }}
                            onClick={() => clicked(`${mese}`)}
                            onMouseDown={(e) => handleMouseDown(e, `${mese}`)}
                            onMouseMove={(e) => handleMouseMove(e)}
                            onMouseUp={(e) => handleMouseUp(e)}>

                            <div className='mont--each'>
                                <span className='mont--each__name'> {mese} </span>
                                <span className='top--line'></span>
                                <span className='bottom--line'></span>
                            </div>

                            <div className='text'>
                                <span className='quantity'> {documenti} doc. </span>
                                <span className='import'> {importo} € </span>
                            </div>

                            <div className='back--green' style={{
                                top: `${backGreen(importo)}px`,
                                left: `${(backLeft === 1 ? (backLeft = 0) + 'px' : (backLeft = backLeft + 81) + 'px')}`
                            }}></div>

                            <div className={`${(months === `${mese}` || months.includes(`${mese}`)) ? 'selector--green' : 'selector--blue'}`}></div>
                        
                        </div></>
                )
            }
        </div>
        :
        null
}

export default App;
