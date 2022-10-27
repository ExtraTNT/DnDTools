export const toHumanreadableString = (mStats, kind) => {
    if (mStats.length == 0) return "This creature has no damage " + kind
    let outputString = "This creature has " + kind + " against "
    if (mStats.length == 1) return outputString + mStats[0] + " damage"
    mStats.forEach((stat, i) => {
        if (i < mStats.length - 2) {
            outputString += stat + ", "
        } else if (i < mStats.length - 1) {
             outputString += stat + " "
        }
        else { outputString += "and " + stat}
    })
    outputString += " damage."
    return outputString
}

