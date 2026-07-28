// ШАГ 1 - Находим элементы на странице
const cartList = document.getElementById('cart-list')
const cartEmpty = document.getElementById('cart-empty')
const cartTotal = document.getElementById('cart-total')
const cartCount = document.getElementById('cart-count')
const addButtons = document.querySelectorAll('.add')
const clearBtn = document.getElementById('cart-clear')

renderCart()

// ШАГ 2 - Читаем корзину из localStorage
function getCart() {
    const cartJSON = localStorage.getItem('cart')

    if (cartJSON === null) {
        return []
    }

    return JSON.parse(cartJSON) // нормальный массив
}

// ШАГ 3 - render -> отрисовка
function renderCart() {
    const cart = getCart()

    // if (cart.length >= 1) {
    //     cartEmpty.style.display = 'none'
    // }
    // else {
    //     cartEmpty.style.display = 'block'
    // }

    cartList.innerHTML = '' // <ul></ul>
    cartEmpty.style.display = cart.length >= 1 ? 'none' : 'block'

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i]

        const li = document.createElement('li') // <li></li>
        li.className = 'cart-item'
        li.innerHTML = `<span class="name">${item.title}</span>`
            + `<span class="qty">${item.qty}</span>`
            + `<span class="sum">${item.price * item.qty} KZT</span>`

        const minus = document.createElement('button')
        minus.className = 'remove'
        minus.textContent = '-'
        minus.addEventListener('click', () => {
            removeOne(item.id)
        })

        li.appendChild(minus)

        cartList.appendChild(li)
    }
}

// ШАГ 4 - Добавление товара
function addToCart(id, title, price) {
    const cart = getCart()

    const foundItem = cart.find(c => c.id === id)

    if (foundItem) {
        foundItem.qty++
    }
    else {
        cart.push({
            id: id,
            title: title,
            price: price,
            qty: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    renderCart()
}


// ШАГ 5 - Добавить для кнопок + событие click
addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, btn.dataset.title, btn.dataset.price)
    })
})


// ШАГ 6 - Чистка корзины
function clearCart() {
    localStorage.removeItem('cart')
    renderCart()
}

clearBtn.addEventListener('click', clearCart)

// ШАГ 7 - Удаление товара из корзины
function removeOne(id) {
    const cart = getCart()

    const foundItem = cart.find(c => c.id === id)

    if (foundItem.qty > 1) {
        foundItem.qty--

        localStorage.setItem('cart', JSON.stringify(cart))
    }
    else {
        // filter - immutable - немутабельный - метод никак не трогает оригинальный массив
        const updatedCart = cart.filter(c => c.id !== foundItem.id)

        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    renderCart()
}


// ДЗ:
// Повторить уроки старые по массивам и обьектам
// в корзине: 0 -> это не работает
// Итого: 0 KZT-> это не работает

// то что не работает исправить