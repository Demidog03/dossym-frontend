// console.log(1)
// setTimeout(() => {
//     // for (let i = 0; i < 10000000000; i++) {

//     // }
//     console.log('Таймаут сработал')
// }, 0)

// console.log(2)
// console.log(3)
// console.log(4)

// Promise.resolve().then(() => {
//     console.log('Промис сработал')
// })

// setInterval(() => {
//     console.log('Hello')
// }, 1000)


// 3. Три сообщения

// Сделай так, чтобы в консоли появилось:

// Готовим...   (сразу)
// Раз          (через 1 секунду)
// Два          (через 2 секунды)
// Три          (через 3 секунды)

// Все три таймера запускаются одновременно — подумай, какие задержки поставить.

console.log ('Готовим...')
// setTimeout(() => {
//     console.log('1 секунды')
// }, 1000)
// setTimeout(() => {
//     console.log('2 секунды')
// }, 2000)
// setTimeout(() => {
//     console.log('3 секунды')
// }, 3000)

let oneSet = 1

const intervalId = setInterval(() => {
    if (oneSet >= 3) {
        clearInterval(intervalId)
    }
    console.log(`${oneSet} секунда`)
    oneSet++
}, 1000)