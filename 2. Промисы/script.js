// setInterval(() => {
//     console.log('Interval');
// }, 1000)
// setTimeout(() => {
//     console.log('Timeout');
// }, 0)


// let isBlockedByEgov = true
// const promise = new Promise((resolve, reject) => {
//     console.log('Создание промиса')
//     if (isBlockedByEgov) {
//         reject('Невозможно оформить рассрочку!');
//     } else {
//         resolve('Рассрочка оформлена!');
//     }
// });
// promise.then((result) => {
//     console.log(`Промис выполнен успешно: ${result}`);
// }).catch((error) => {
//     console.error(`Промис завершился с ошибкой: ${error}`);
// }).finally(() => {
//     console.log('Промис завершен');
// });
// console.log('hello')

// Задание 1

// let coffeeBeansLeft = 0; // остаток зёрен в граммах

// 1. Создай промис makeCoffee:
//    - если coffeeBeansLeft >= 18 → resolve('Кофе готов!')
//    - иначе → reject('Зёрна закончились!')
//    - внутри промиса сразу выведи в консоль 'Запускаем кофемашину'

// 2. Обработай его через .then / .catch / .finally
//    В finally выведи 'Кофемашина выключена'

// 3. Перед промисом поставь setTimeout с задержкой 0,
//    который выводит 'Протираем столик'

// 4. После всего кода выведи 'Клиент ждёт'

// setTimeout(()=>{
//     console.log('Протираем столик')
// })
// let coffeeBeansLeft = 0;
// const makeCoffe = new Promise ((resolve, reject) => {
//     console.log('Запускаем кофемашину')
//     if (coffeeBeansLeft >= 18) {
//         resolve('Кофе готово')
//     }
//     else {
//         reject('Зерно закончились')
//     }
// });
// makeCoffe.then((result)=>{ 
//     console.log(result)   
// }).catch((ghnfdhjgfhgf)=>{
//     console.error(ghnfdhjgfhgf)
// }).finally(()=>{
//     console.log('Кофе машина выключена')
// });
// console.log('Клиент ждет')


// function loadUser() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const user = { id: 1, name: 'Dossym', phoneNumber: '+77012345678' };
//             resolve(user);
//         }, 2000)
//     })  
// }

// loadUser().then((user) => {
//     console.log(`Пользователь загружен: ${user.name}`);
//     return user.phoneNumber;
// }).then((phoneNumber) => {
//     // имитация отправки смс
//     console.log(`Отправка смс по номеру телефона: ${phoneNumber}`);
// }).catch((error) => {
//     console.error(`Ошибка: ${error}`);
// })

// Задание 2
// 1. Напиши функцию loadUserWithBalance(), которая возвращает промис.
//    Через 1000 мс резолвится объектом:
//    { name: 'Dossym', balance: 5000 }

// 2. В первом .then выведи: 'Баланс загружен: 5000 тг'
//    и верни (return) сам баланс — число.

// 3. Во втором .then проверь:
//    если баланс >= 1000 — выведи 'Оплата прошла'
//    иначе — выведи 'Недостаточно средств'

// 4. Добавь .catch с выводом ошибки.

// const hasInternet = false

// function loadUserWithBalance() {
//     return new Promise((resolve, reject) => {
//         if (hasInternet === true) {
//             setTimeout(() => {
//                 const user = { name: 'Dossym', balance: 500 }
//                 resolve(user)
//             }, 1000)
//         } else {
//             reject('Нет доступа к интернету')
//         }
//     })
// }
// loadUserWithBalance().then((user) => {
//     console.log(`Баланс загружен: ${user.balance} тг`)
//     return user.balance
// }).then((balance) => {
//     if (balance >= 1000) {
//         console.log('Оплата прошла ')
//     } else {
//         console.log('Недостаточно средств')
//     }
// }).catch((error)=> {
//     console.error(error)
// })


// function delay(ms, value) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(value)
//         }, ms)
//     })
// }


// 1. Promise all
// const loadUser = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve({ name: 'Dossym', phoneNumber: '+77012345678' })
//     }, 1000)
// })
// const loadOrders = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(['Наушники', 'Клавиатура', 'Мышь', 'Чехол'])
//     }, 2000)
// })
// const loadBalance = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve({ balance: 15000 })
//     }, 1500)
// })

// console.time('all')
// Promise.all([loadBalance, loadUser, loadOrders]).then(([balance, user, orders]) => {
//     console.log(`Баланс: ${balance.balance} тг`);
//     console.log(`Пользователь: ${user.name}, Телефон: ${user.phoneNumber}`);
//     console.log(`Заказы: ${orders.join(', ')}`);
//     console.timeEnd('all')
// })


// 2. Promise race
// const server1 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('Ответ от сервера 1')
//     }, 200)
// })
// const server2 = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('Ответ от сервера 2')
//     }, 1000)
// })

// Promise.race([server1, server2]).then((result) => {
//     console.log(result)
// })


// 1. Создай три промиса:
//
//    almatyWeather  — через 900 мс резолвится:
//              { city: 'Алматы', temp: 24, condition: 'ясно' }
//
//    astanaWeather  — через 1800 мс резолвится:
//              { city: 'Астана', temp: 31, condition: 'ветрено' }
//
//    aktauWeather   — через 1300 мс резолвится:
//              { city: 'Актау', temp: 34, condition: 'жара' }

// 2. Через Promise.all выведи по строке на каждый город:
//    'Алматы: 24°, ясно'
//    'Астана: 31°, ветрено'
//    'Актау: 34°, жара'

// 3. Замерь время через console.time / console.timeEnd.

// const almatyWeather = new Promise((resolve)=>{
//     setTimeout(()=>{
//         resolve({ city: 'Алматы', temp: 24, condition: 'ясно' })
//     }, 900)
// })
// const astanaWeather = new Promise((resolve)=>{
//     setTimeout(()=>{
//         resolve({ city: 'Астана', temp: 31, condition: 'ветрено' })
//     },1800)
// })
// const aktauWeather = new Promise((resolve)=>{
//     setTimeout(()=>{
//         resolve({ city: 'Актау', temp: 34, condition: 'жара' })
//     },1300)
// })

// console.time('all')
// Promise.all([almatyWeather, astanaWeather, aktauWeather]).then(([almaty, astana, aktau])=>{
//     console.log(almaty)
//     console.log(astana)
//     console.log(aktau)
//     console.timeEnd('all')
// })


// 1. Создай четыре промиса:
//
//    tokyo     — 240 мс → 'Подключение к Tokyo (240ms)'
//    frankfurt — 180 мс → 'Подключение к Frankfurt (180ms)'
//    virginia  — 310 мс → 'Подключение к Virginia (310ms)'
//    singapore — 195 мс → 'Подключение к Singapore (195ms)'

// 2. Через Promise.race выведи выбранный сервер.
const serverTokyo = new Promise((resolve)=>{
    setTimeout(() =>{
        resolve('Подключение к Tokyo (240ms)')
    },240)
})
const serverFrankfurt = new Promise((resolve)=>{
    setTimeout(() =>{
        resolve('Подключение к Frankfurt (180ms)')
    },180)
})
const serverVirginia = new Promise((resolve)=>{
    setTimeout(() =>{
        resolve('Подключение к Virginia (310ms)')
    },310)
})
const serverSingapore = new Promise((resolve)=>{
    setTimeout(() =>{
        resolve('Подключение к Singapore (195ms)')
    },195)
})

Promise.race([serverTokyo, serverFrankfurt, serverSingapore, serverVirginia]).then((result)=>{
    console.log(result)
})