// Client Side Javascript
console.log('client side javascript file is loaded.')

// fetch API is not accessible by nodeJS. therefore it cannot be used backend.


 
const weatherForm = document.querySelector('form') //selects the element from the html document, and returns a javascript representation of the element
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//Event lister to add to element to respond to event and run a function
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => { //string URL we are trying to fetch from: async
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    }) 
})