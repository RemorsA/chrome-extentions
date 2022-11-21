let add_task = document.querySelector('#add_task')
let card_title = document.querySelector('#card_title')
let card_about = document.querySelector('#card_about')
let save_task = document.querySelector('#save_task')
let start_time = document.querySelector('#start_time')
let pause_time = document.querySelector('#pause_time')

let completed_tasks = []
let current_tasks = []

let hour = 00,
    min = 00,
    sec = 00,
    interval

add_task.addEventListener('click', () => {
    document.querySelector('.modal_card-add').style.display = 'block'
    document.querySelector('.table_container').style.display = 'none'
})

save_task.addEventListener('click', () => {
    let data = {
        titile: card_title.value,
        about: card_about.value,
        time: hour + ':' + min + ':' + sec,
        date: new Date()
    }
    data.date = ('0' + data.date.getDate()).slice(-2) + '.' + ('0' + (data.date.getMonth() + 1)).slice(-2) + '.' + data.date.getFullYear()
    console.log(
        data
    )
    // clearInterval(interval)

    hour = 00
    min = 00
    sec = 00
    current_tasks.push(data)
    chrome.storage.local.set('dd', JSON.stringify(current_tasks));
    // localStorage.setItem('tasks', JSON.stringify(current_tasks))

    let dd = localStorage.getItem('tasks')
    console.log(dd)
})

function start_timer () {
    sec++
    if (sec < 60) {
        document.querySelector('#sec').innerText = sec
    }
    if (sec > 60) {
        min++
        document.querySelector('#min').innerText = min
        sec = 00
    }

    if (min < 60) {
        document.querySelector('#min').innerText = min
    }
    if (min > 60) {
        hour++
        document.querySelector('#hour').innerText = hour
        min = 00
    }

    if (hour > 24) {
        document.querySelector('#hour').innerText = '00'
    }
}

start_time.addEventListener('click', () => {
    clearInterval(interval)
    interval = setInterval(start_timer, 60)
    pause_time.style.display = 'block'
    start_time.style.display = 'none'
})
pause_time.addEventListener('click', () => {
    clearInterval(interval)
    pause_time.style.display = 'none'
    start_time.style.display = 'block'
})