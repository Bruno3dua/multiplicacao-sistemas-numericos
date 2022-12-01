export function resultToString(line) {
    let strResult = ''
    for (let i = 0; i < line.length; i++) {
        strResult += line[i]
    }
    return strResult
}

export function getBiggestElementLength(element) {
    let numberOfElements = element.length
    let biggest = 0
    for (let i = 0; i < numberOfElements; i++) {
        if (element[i].length > biggest)
            biggest = element[i].length
    }
    return biggest
}

export function createNewMatrix(line, column) {
    let matrix = new Array(line);
    for (let i = 0; i < line; i++)
        matrix[i] = new Array(column);
    return matrix
}

export function fillUndefinedElements(arrayelements) {
    for (let i = 0; i < arrayelements.length; i++) {
        let currentElement = arrayelements[i]

        arrayelements[i] = currentElement.padStart(getBiggestElementLength(arrayelements), '0')
    }
}

