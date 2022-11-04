import { io } from "socket.io-client";

const messages = [
  'hello',
  'testing',
  'first socket project',
  'hope it works',
  'bye'
]

document.querySelector('#app').innerHTML = `
  <div>
    <p id="id"></p>
    <p id="room"></p>
    <ul id="messages"></ul>
  </div>
`

const socket = io('http://localhost:3000')

const room = '1234'

socket.on('connect', () => {
  displayInfo('Connected with ID: ' + socket.id, 'id')
})

socket.emit('join-room', room)

socket.on('joined-room', room => {
  displayInfo('Joined room: ' + room, 'room')
})

messages.map(message => socket.emit('send-message', message, room))

socket.on('receive-message', message => {
  displayMessage(message)
})

function displayInfo(info, id) {
  const text = document.getElementById(id)
  text.innerHTML += info
}

function displayMessage(message) {
  const ul = document.getElementById('messages')
  const li = document.createElement('li')
  li.innerHTML = message
  ul.appendChild(li)
}