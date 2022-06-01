import { atom } from "jotai";

type slotsType = 'main' | 'secondary' | 'negative'

const stoneSize = atom(10)
const facetRate = atom(0.75)
const stoneSlots = atom({
    main: new Array(10).fill(0),
    secondary: new Array(10).fill(0),
    negative: new Array(10).fill(0)
})
const resetStone = atom(get => get(stoneSize),
    (get, set, size: number) => {
        set(stoneSlots, {
            main: new Array(size).fill(0),
            secondary: new Array(size).fill(0),
            negative: new Array(size).fill(0)
        })
        set(stoneSize, size)
        set(facetRate, 0.75)
    }
)
const facetStone = atom(
    get => get(stoneSlots),
    (get, set, pos: slotsType) => {
        const stones = get(stoneSlots)
        const rate = get(facetRate)
        const selectedSlots = stones[pos]
        const slotIndex = selectedSlots.findIndex(n => n === 0)
        if (slotIndex === -1) return
        else {

            /* ### THE MATH ### */
            const isSuccess = Math.random() < rate
            /* 
            Math.random return a random value between 0 - 1
            e.g. if math.random return a 0.72,
            its a success if the rate is 0.75 and
            a failure if the rate is 0.65
            */

            selectedSlots[slotIndex] = isSuccess ? 1 : -1
            set(stoneSlots, {...stones})
            set(facetRate, prev => {
                prev += isSuccess ? -0.1 : 0.1
                if (prev < 0.247 || prev > 0.75) return rate
                
                return Math.round(prev*100)/100
            })
        }
    }
)
const getStoneResult = atom(get => {
    const stone = get(stoneSlots)
    const result = {
        main: stone.main.filter(n => n === 1).length,
        secondary: stone.secondary.filter(n => n === 1).length,
        negative: stone.negative.filter(n => n === 1).length
    }
    return result
})
const getRatePercentage = atom(get => Math.round(get(facetRate)*100))


export {
    stoneSize,
    facetRate,
    stoneSlots,
    facetStone,
    resetStone,
    getStoneResult,
    getRatePercentage
}