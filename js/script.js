import { resultToString, getBiggestElementLength, createNewMatrix, fillUndefinedElements } from "./utils.js"

const firstNumber = document.querySelector('#firstNumber')
const secondNumber = document.querySelector('#secondNumber')
const form = document.querySelector('form')
const multiplierDisplay = document.querySelector('#multiplier')
const multiplicandDisplay = document.querySelector('#multiplicand')
const containerResult = document.querySelector('.container-result')
const sumResult = document.querySelector('#sumResult')

let countLines = []


const Operation = {
    multiplicand: '',
    multiplaier: '',
    lenghtOfMultiplicand: '',
    lenghtOfMultiplier: '',
    base: document.querySelector('#base') 
}

const Modal = {
    btnClose: document.querySelector(".close"),
    wrapper: document.querySelector(".modalWrapper"),

    open() {
        Modal.wrapper.classList.remove('hide')
    },

    close() {
        Modal.wrapper.classList.add('hide')
    }
}

const Alert = {
    msg: document.querySelector('.error'),
    open() {
        this.msg.classList.remove('hide')
    },
    close() {
        this.msg.classList.add('hide')
    }
}

function areValuesValid() {
    for (let i = 0; i < Operation.lenghtOfMultiplicand; i++) {
        if (Operation.multiplicand[i] >= Number(Operation.base.value))
            return false
    }
    for (let i = 0; i < Operation.lenghtOfMultiplier; i++) {
        if (Operation.multiplaier[i] >= Number(Operation.base.value))
            return false     
    }
    return true
}


function updateDisplay() {
    multiplicandDisplay.innerHTML = firstNumber.value
    multiplierDisplay.innerHTML = `<p> <span>x</span>  ${secondNumber.value}</p> ` 
}

function updateOperation() {
    Operation.multiplicand = firstNumber.value
    Operation.multiplaier = secondNumber.value
    Operation.lenghtOfMultiplicand = firstNumber.value.length
    Operation.lenghtOfMultiplier = secondNumber.value.length
}

function resetResult() {
    containerResult.innerHTML = ''
    countLines = []
}

function multiply(multiplicand, multiplaier, base) {
    let resultArray = []
    let sobe = 0

    for (let j = Operation.lenghtOfMultiplicand; j > 0; j--) {

        let multiplication = multiplicand[j - 1] * multiplaier

        let rest = (multiplication + sobe) % base
        let result = Math.floor((multiplication + sobe) / base)

        sobe = result
        resultArray.unshift(rest)
    }

    if (sobe != 0)
        resultArray.unshift(sobe)
    return resultArray
}

function sum(elements, base) {

    let sobe = 0
    let resultArray = []
    let sumCount = elements.length
    let biggestElementLength = getBiggestElementLength(elements)

    let matrix = createNewMatrix(sumCount, biggestElementLength)

    fillUndefinedElements(elements)

    // fill the matrix
    for (let i = 0; i < sumCount; i++) {
        for (let j = biggestElementLength - 1; j >= 0; j--) {
            matrix[i][j] = (elements[i])[j]
        }
    }

    // sum results 
    for (let j = biggestElementLength - 1; j >= 0; j--) {
        let columnSum = 0
        for (let i = 0; i < sumCount; i++) {
            columnSum = columnSum + Number(matrix[i][j])
        }

        let rest = (columnSum + sobe) % base

        sobe = Math.floor((columnSum + sobe) / base)
        resultArray.unshift(rest)
    }
    if (sobe != 0)
        resultArray.unshift(sobe)
    return resultArray
}


form.onsubmit = (e) => {
    e.preventDefault()
    updateOperation()
    areValuesValid()

    let inputIsNotANumber = isNaN(Number(firstNumber.value)) || isNaN(Number(secondNumber.value)) 
    let zeros = ''

    if(inputIsNotANumber) {
        Alert.msg.innerHTML = 'Digite apenas números'
        Alert.open()
        setTimeout(() => {
            Alert.close()
        }, 2000)
        return
    }

    if(!areValuesValid()) {
        Alert.msg.innerHTML = 'Você deve digitar um número válido de acordo com a base'
        Alert.open()
        setTimeout(() => {
            Alert.close()
        }, 3000)
        return
    }

    for (let i = Operation.lenghtOfMultiplier; i > 0; i--) {
        let newLine = multiply(Operation.multiplicand, Operation.multiplaier[i - 1], Operation.base.value)
        let resultString = `<p>${resultToString(newLine)}<span>${zeros}</span></p>`
        containerResult.innerHTML += resultString
        countLines.push(resultToString(newLine) + zeros)

        zeros += '0'
    }

    updateDisplay()

    Modal.open()

    sumResult.innerHTML = resultToString(sum(countLines, Operation.base.value))
}

Modal.btnClose.addEventListener('click', () => {
    Modal.close()
    resetResult()
})