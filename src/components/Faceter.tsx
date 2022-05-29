import { useEffect, useMemo, useState } from 'react'
import engrav1 from '../images/engrav1.png'
import engrav2 from '../images/engrav2.png'
import engrav3 from '../images/engrav3.png'



export default function Faceter({ size=10}) {
    const [rate, setRate] = useState(0.75)
    const [slots, setSlots] = useState({
        main: [0],
        secondary:[0],
        negative: [0]
    })
    const [curPos, setCurPos] = useState({
        main: 0,
        secondary: 0,
        negative: 0
    })

    useEffect(() => {
        const arr = new Array(size).fill(0)
        setSlots({
            main: arr,
            secondary: arr,
            negative: arr
        })
        console.log('sd')
    }, [])

    const handleClick = (pos: 'main'|'secondary'|'negative') => {
        if (curPos[pos] === size) return
        const success = Math.random() <= rate
        const tempPos = curPos
        const tempSlots = slots
        console.log(tempSlots)
        tempSlots['main'][tempPos[pos]] = 1
        console.log(tempSlots)
        setSlots({...tempSlots})
        setRate(prev => {
            prev += success ? -0.1 : 0.1
            if (prev >= 0.75 || prev <= 0.25) return rate
            return prev
        })   
        tempPos[pos] += 1
        setCurPos(tempPos)

    }

    return (
        <div className="facet-wrapper">
            <p>{rate}</p>
            <p>{curPos.main}</p>
            <div className="facet-box">
                <img className='facet-image' src={engrav1} />
                <h3 className="name">Main</h3>
                <div className='slots'>
                    {slots.main.map(i => <Slot status={i} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('main')}>facet</div>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav1} />
                <h3 className="name">Secondary</h3>
                <div className='slots'>
                    {slots.secondary.map(i => <Slot status={i} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('secondary')}>facet</div>
            </div>
            <div className="facet-box">
                <img className='facet-image' src={engrav1} />
                <h3 className="name">Negative</h3>
                <div className='slots'>
                    {slots.negative.map(i => <Slot status={i} />)}
                </div>
                <div className='hammer' onClick={() => handleClick('negative')}>facet</div>
            </div>
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