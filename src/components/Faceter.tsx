import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useAtom } from 'jotai'

import engrav1 from '../images/engrav1.png'
import engrav2 from '../images/engrav2.png'
import engrav3 from '../images/engrav3.png'
import IconHammer from '../images/hammer.png'
import { facetRate, facetStone, getRatePercentage, getStoneResult, resetStone } from '../store'



export default function Faceter({ size=10}) {
    const [stoneSlots, setFacet] = useAtom(facetStone)
    const [rate,] = useAtom(getRatePercentage)
    const [stoneSize, setSize] = useAtom(resetStone)
    const [stoneResults] = useAtom(getStoneResult)
    const [selectedSize, setSelectedSize] = useState(10)

    useEffect(() => {
        setSize(size)
    }, [size])


    const handleClick = (slot: 'main'|'secondary'|'negative') => {
        setFacet(slot)

    }

    const resetButton = (e:FormEvent) => {
        e.preventDefault()
        setSize(selectedSize)
    }

    return (
        <div className="facet-wrapper">
            <h3>Facet Stone</h3>
            <div className='facet-head'>               
                <p>Success chance: {rate}%</p>
                <form onSubmit={resetButton}>
                    <label htmlFor='size-select'>size: </label>
                    <select 
                    value={selectedSize} 
                    name='size-select' 
                    id='size-select'
                    onChange={e => setSelectedSize(parseInt(e.target.value))}
                    >
                        {[4,5,6,7,8,9,10,11].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <button 
                    type='submit'

                    >reset</button>
                </form>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav1} />
                <h3 className="name">Main</h3>
                <div className='slots'>
                    {stoneSlots.main.map((slot, i) => <Slot key={i} status={slot} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('main')}>
                    <img src={IconHammer} />
                </div>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav2} />
                <h3 className="name">Secondary</h3>
                <div className='slots'>
                    {stoneSlots.secondary.map((slot, i) => <Slot key={i} status={slot} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('secondary')}>
                    <img src={IconHammer} />
                </div>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav3} />
                <h3 className="name">Negative</h3>
                <div className='slots'>
                    {stoneSlots.negative.map((slot, i) => <Slot key={i} status={slot} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('negative')}>
                    <img src={IconHammer} />
                </div>
            </div>

            <p>main: x{stoneResults.main}</p>
            <p>secondary: x{stoneResults.secondary}</p>
            <p>negative: x{stoneResults.negative}</p>
        </div>
    )
}





const Slot = ({ status=0 }) => {
    const color = useMemo(() => {
        if (status === 1) return 'green'
        if (status === -1) return 'red'
        return 'gray'
    }, [status])


    return (
        <div className='slot' style={{ backgroundColor: color}}></div>
    )
}