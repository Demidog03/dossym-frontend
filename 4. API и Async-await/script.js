const API_URL = 'https://fakestoreapi.com/products';

const grid = document.getElementById('grid');
const stateBox = document.getElementById('state');
const countBox = document.getElementById('count');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const cartCount = document.getElementById('cart-count');

let allProducts = []

loadProducts()

function loadProducts() {
    showState('Загружаем товары...', 'loading')
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('сервер ответил ' + response.status)
            }
            return response.json()
        })
        .then(products => {
            allProducts = products
            console.log(products)
            render()
            showState('')
            countBox.innerHTML = `Количество: <b>${allProducts.length}</b>` 
        })
        .catch(error => {
            showState(error.message, 'error')
        })
    
}

function render() {
    const cards = allProducts.map(product => createCard(product))
    grid.append(...cards)
}

function createCard(product) {
    const card = document.createElement('li')
    card.className = 'card'

    const image = document.createElement('img')
    image.src = product.image
    image.alt = product.title
    image.loading = 'lazy'

    const body = document.createElement('div')
    body.className = 'card-body'

    const category = document.createElement('div')
    category.className = 'card-category'
    category.textContent = product.category

    const title = document.createElement('h2')
    title.className = 'card-title'
    title.textContent = product.title

    const rating = document.createElement('div');
    rating.className = 'card-rating'
    rating.textContent = `★ ${product.rating.rate}, ${product.rating.count} оценок`

    const foot = document.createElement('div')
    foot.className = 'card-foot'

    const price = document.createElement('span')
    price.className = 'card-price'
    price.textContent = `$ ${product.price}`

    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = 'В корзину'
    button.dataset.id = product.id

    foot.append(price, button)
    body.append(category, title, rating, foot)
    card.append(image, body)

    return card
}

function showState(message, type) {
    stateBox.className = 'state' + (type === 'error' ? ' error' : '')
    stateBox.textContent = message
    if (type === 'loading') {
        const bar = document.createElement('div')
        bar.className = 'bar'
        stateBox.append(bar)
    }
}


// 1. Обрезать длинные названия до 50 символов (slice + '…').
// 2. Реализовать логику корзины/