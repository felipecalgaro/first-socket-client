import { io } from "socket.io-client";

document.querySelector('#app').innerHTML = `
  <div>
    <p id="text"></p>
  </div>
`

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  displayMessage('connected with id ' + socket.id)
})

function displayMessage(message) {
  const text = document.getElementById('text')
  text.innerHTML = message
}