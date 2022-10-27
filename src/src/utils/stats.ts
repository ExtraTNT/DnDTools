export const getMod = (stat:number) => {
    // reduces the stat by -1 when it is below 10, to use the rounding
    stat <= 9? stat--: null
    let tmp = (stat-10) / 2
    return tmp - tmp%1
}
