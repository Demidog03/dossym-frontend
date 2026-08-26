// fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
//     return response.json()
// }).then(data => {
//     console.log(data)
// })

// fetch('https://jsonplaceholder.typicode.com/todos').then((response) => {
//     return response.json()
// }).then(data => {
//     console.log(data)
// })

// fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
//     return response.json()
// }).then(users => {
//     console.log(users)
//     console.log(users.map(user => {
//         return user.name
//     }))
// })


// 1. Первый запрос
// https://jsonplaceholder.typicode.com/todos/1
// Получи объект и выведи в консоль только title.

// fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
//     return response.json()
// }).then(data => {
//     console.log(data)
//     console.log(data.title)
// })

// 4. https://jsonplaceholder.typicode.com/users/3
// Выведи email этого пользователя.

// fetch('https://jsonplaceholder.typicode.com/users/3').then((response) => {
//     return response.json()
// }).then(data => {
//     console.log(data)
// })

// 7. https://jsonplaceholder.typicode.com/users/1
// Выведи город: он лежит внутри address.

// fetch('https://jsonplaceholder.typicode.com/users/1').then((response) =>{
//     return response.json()
// }).then(data => {
//     console.log(data.address.city)
// })

// 5. https://jsonplaceholder.typicode.com/posts
// Выведи, сколько всего постов пришло. (Ответ — массив, значит .length.)

// fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>{
//     return response.json()
// }).then(data => {
//     console.log(data.length)
// })

// 6. https://jsonplaceholder.typicode.com/comments
// Выведи email автора самого первого комментария.

// fetch('https://jsonplaceholder.typicode.com/comments').then ((response) => {
//     return response.json()
// }).then (data => {
//     console.log(data[0].email)
// })

// 8. https://jsonplaceholder.typicode.com/todos
// Выведи заголовки первых пяти задач. (slice(0, 5))

// fetch ('https://jsonplaceholder.typicode.com/todos').then((response)=> {
//     return response.json()
// }).then (data => {
//     console.log(data.slice(0, 5).map(todo =>{
//         return todo.title
//     }))
// })

// 9. https://catfact.ninja/fact
// Выведи факт о кошках — он в поле fact.

// fetch('https://catfact.ninja/fact').then((response) => {
//     return response.json()
// }).then (data => {
//     console.log(data.fact)
// })

// 10. https://dummyjson.com/quotes/1
// Выведи цитату и её автора в одну строку.

// fetch('https://dummyjson.com/quotes/1').then((response)=>{
//     return response.json()
// }).then (data => {
//     const author = data.author
//     const quote = data.quote
//     console.log(`${quote} ${author}`)
// })

// 11. https://dummyjson.com/products
// Массив лежит не в корне, а в поле products. Выведи названия всех товаров.

// fetch('https://dummyjson.com/products').then((response)=>{
//     return response.json()
// }).then (data => {
//     console.log(data.products.map (todo =>{
//         return todo.title
//     }))
// })  

// 12. https://api.github.com/users/torvalds
// Выведи name и public_repos.

// fetch ('https://api.github.com/users/torvalds').then((response) => {
//     return response.json()
// }).then(data =>{
//     console.log(data.name)
//     console.log(data.public_repos)
// })


// 13. https://pokeapi.co/api/v2/pokemon/pikachu
// Выведи имя и вес покемона.

// fetch ('https://pokeapi.co/api/v2/pokemon/pikachu').then((response)=> {
//     return response.json()
// }).then (data =>{
//     console.log(`${data.name} ${data.weight}`)
// })

// 14. https://restcountries.com/v3.1/name/kazakhstan
// Ответ — массив с одним элементом. Выведи столицу.

// fetch ('https://restcountries.com/v3.1/name/kazakhstan').then ((response)=>{
//     return response.json()
// }).then (data => {
//     console.log(data)
// })

// 15. https://jsonplaceholder.typicode.com/users
// Выведи только имена тех, у кого в email есть слово biz.

// fetch('https://jsonplaceholder.typicode.com/users').then((response)=>{
//     return response.json()
// }).then (data=>{
//     console.log(data.filter(user =>{
//         return user.email.includes('biz')
//     }))
// })