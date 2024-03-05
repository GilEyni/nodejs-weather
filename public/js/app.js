document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
    const info1 = document.getElementById('info1')
    const info2 = document.getElementById('info2')
    
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        info1.innerHTML = ''
        info2.innerHTML = ''
        const address = search.value

        fetch(`/weather?address=${address}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    info1.innerHTML = data.error
                }
                else{
                    info1.innerHTML = data.forecast
                    info2.innerHTML = data.location
                }
            })
        })
    })
})