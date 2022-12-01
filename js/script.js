import { toggleHideElement } from './utils.js'

const form = document.querySelector('form')
const btnClose = document.querySelector('.close')

const modal = document.querySelector('.modalWrapper')
const errorMsg = document.querySelector('.error')

const firstNumber = document.querySelector('#firstNumber')
const secondNumber = document.querySelector('#secondNumber')
const base = document.querySelector('#base')

const multiplicand = firstNumber.value
const multiplier = secondNumber.value

function multiply(number1, number2, base = 10) {
    return number1 * number2
}

form.onsubmit = (e) => {
    e.preventDefault()

    toggleHideElement(modal)
    console.log(multiplicand)
    console.log(multiplier)
    console.log(multiply(multiplicand, multiplier, 10)) 
}

btnClose.addEventListener('click', () => {
    toggleHideElement(modal)
})