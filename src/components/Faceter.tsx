import { useEffect, useMemo, useState } from 'react'
import { useAtom } from 'jotai'

import engrav1 from '../images/engrav1.png'
import engrav2 from '../images/engrav2.png'
import engrav3 from '../images/engrav3.png'
import { facetRate, facetStone, getStoneResult, resetStone } from '../store'



export default function Faceter({ size=10}) {
    const [stoneSlots, setFacet] = useAtom(facetStone)
    const [rate,] = useAtom(facetRate)
    const [, setSize] = useAtom(resetStone)
    const [stoneResults] = useAtom(getStoneResult)
    useEffect(() => {
        setSize(size)
    }, [size])

    const handleClick = (slot: 'main'|'secondary'|'negative') => {
        setFacet(slot)

    }

    return (
        <div className="facet-wrapper">
            <p>{rate}</p>
            <p>{rate}</p>
            <div className="facet-box">
                <img className='facet-image' src={engrav1} />
                <h3 className="name">Main</h3>
                <div className='slots'>
                    {stoneSlots.main.map((slot, i) => <Slot key={i} status={slot} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('main')}>facet</div>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav2} />
                <h3 className="name">Secondary</h3>
                <div className='slots'>
                    {stoneSlots.secondary.map((slot, i) => <Slot key={i} status={slot} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('secondary')}>facet</div>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav3} />
                <h3 className="name">Negative</h3>
                <div className='slots'>
                    {stoneSlots.negative.map((slot, i) => <Slot key={i} status={slot} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('negative')}>facet</div>
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