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

const form = document.querySelector('form')
const firstNumber = document.querySelector('#firstNumber')
const secondNumber = document.querySelector('#secondNumber')
const base = document.querySelector('#base')

const multiplierDisplay = document.querySelector('#multiplier')
const multiplicandDisplay = document.querySelector('#multiplicand')

const containerResult = document.querySelector('.container-result')

let lenghtOfMultiplier
let lenghtOfMultiplicand

function multiply(multiplicand, multiplaier, base = 10) {
    let resultArray = []
    let sobe = 0

    lenghtOfMultiplier = secondNumber.value.length
    lenghtOfMultiplicand = firstNumber.value.length

    for (let i = lenghtOfMultiplier; i > 0; i--) {
        for (let j = lenghtOfMultiplicand; j > 0; j--) {


            let multiplication = multiplicand[j - 1] * multiplaier[i - 1]

            let rest = (multiplication + sobe) % base
            let result = Math.floor((multiplication + sobe) / base)

            sobe = result
            resultArray.unshift(rest)
        }
    }

    if (sobe != 0)
        resultArray.unshift(sobe)
    return resultArray
}

function printLineResult(line) {
    let strResult = ''
    for (let i = 0; i < line.length; i++) {
        strResult += line[i]
    }
    return strResult
}

function updateDisplay() {
    multiplicandDisplay.innerHTML = firstNumber.value
    multiplierDisplay.innerHTML = 'x   ' + secondNumber.value
}

form.onsubmit = (e) => {
    e.preventDefault()

    multiply(firstNumber.value, secondNumber.value, base.value)

    for (let i = 0; i < lenghtOfMultiplier; i++) {
        console.log('ok')
        let lineResult = multiply(firstNumber.value, secondNumber.value, base.value)
        containerResult.innerHTML += `<p>${printLineResult(lineResult)}</p>`
    }

    Modal.open()
    updateDisplay()
}

Modal.btnClose.addEventListener('click', () => {
    Modal.close()
})




// console.log('multiplicand: ' + multiplicand[j-1])
// console.log('multiplier: ' + multiplaier[i-1])
// console.log('resto: ' + rest)
// console.log('multiplicação: ' + multiplicand[j-1] * multiplaier[i-1])
