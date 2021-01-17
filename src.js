const display = document.getElementById('divDisplay')
const num = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')
let newNumber = true
let operador
let numAnterior


const operacaoPendente = () => operador != undefined


const calcular = () => {
    if(operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(",","."))
        newNumber = true
        if(operador == "+") {
            atualizarDisplay(numAnterior + numeroAtual)
        }

        else if(operador == "-") {
            atualizarDisplay(numAnterior - numeroAtual)
        }

        else if(operador == "/") {
            atualizarDisplay(numAnterior / numeroAtual)
        }

        else if(operador == "*") {
            atualizarDisplay(numAnterior * numeroAtual)
        }
     }
}


const atualizarDisplay = (text) => {
    if (newNumber) {
        display.textContent = text.toLocaleString('BR')
        newNumber = false
    } else {
        display.textContent += text.toLocaleString('BR')
    }

}

const inserirNum = (event) => {
    atualizarDisplay(event.target.textContent)
}

num.forEach(numero => numero.addEventListener('click', inserirNum))

const selecionarOperador = (event) => {

    if (!newNumber) {
        calcular()
        newNumber = true
        operador = event.target.textContent
        numAnterior = parseFloat(display.textContent.replace(',','.'))
    }

}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

const acionarIgual = () => {
    calcular()
    operador = undefined
}
document.getElementById("igual").addEventListener('click',acionarIgual)

const limparDisplay = () => {
    display.textContent = ""
}
document.getElementById("limparDisplay").addEventListener('click',limparDisplay)

const limparCalculo = () => {
    limparDisplay()
    operador = undefined
    newNumber = true
    numAnterior = undefined
}
document.getElementById("limparCalculo").addEventListener('click',limparCalculo)

const removeUltimoNum = () => {
    display.textContent = display.textContent.slice(0,-1)
}
document.getElementById('backspace').addEventListener('click', removeUltimoNum)

const inverterNum = () => {
    newNumber = true
    atualizarDisplay(display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click',inverterNum)


const existeDecimal = () => display.textContent.indexOf(",") != -1

const existeValor = () => display.textContent.length  > 0 



const inserirDecimal = () => {
    if(!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(',')
        }
        else {
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click',inserirDecimal)


const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    'Escape' : 'limparDisplay',
    'c' : 'limparCalculo',
    'Backspace' : 'backspace',
    '/' : 'operadorDivisao',
    '*' : 'operadorMultiplicacao',
    '-' : 'operadorSubtrair',
    '+' : 'operadorSomar',
    'Enter' : 'igual',
    '=' : 'igual',
    ',' : 'decimal'
}

const mapearTeclado = (event) => {
    const tecla = event.key

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1
    if(teclaPermitida()) {
        document.getElementById(mapaTeclado[tecla]).click()
    }
     
    
    
}
document.addEventListener('keydown', mapearTeclado)