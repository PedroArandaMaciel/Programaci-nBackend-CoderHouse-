const socket = io();

const fechaHora = () => {
    const fh = new Date();
    const day = fh.getDate()
    const month = fh.getMonth()
    const year = fh.getFullYear()
    const hours = fh.getHours()
    const minutes = fh.getMinutes()
    const seconds = fh.getSeconds()
    return `[${day}/${month}/${year} ${hours}:${minutes}:${seconds}]`
}

let emailUser;
const chatBox = document.getElementById('chatBox')
const userMail = document.getElementById('userMail')
const saludoUser = document.getElementById('saludoUser')
const sendMsgButton = document.getElementById('sendMsgButton')

userMail.addEventListener('keyup', e => {
    if (e.key === 'Enter' && userMail.value.trim().length > 0) {
        socket.emit('authenticated', { email: userMail.value.trim() })
        emailUser = userMail.value.trim()
        chatBox.disabled = false
        userMail.disabled = true
        userMail.value='Usuario registrado'
        saludoUser.innerHTML = `Bienvenido ${emailUser}`
    }
})
sendMsgButton.addEventListener('click', e => {
    if (chatBox.value.trim().length > 0) {
        socket.emit('message', { emailUser, date:fechaHora(), message: chatBox.value.trim() }) //trim borra espacios de mas
        chatBox.value = ''
    }
})


//socket listeners
socket.on('logs', data => {
    const logsPanel = document.getElementById('logsPanel')
    let message = '';
    data.forEach(msg => {
        message += `<p>${msg.emailUser} ${msg.date}: ${msg.message}</p>`
    });
    logsPanel.innerHTML = message
})

socket.on('newUserConnected', data => {
    if (!emailUser) return;
    console.log(data + " se unio al chat")
    Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 2000,
        title: `${data} se ha unido al chat`,
        icon: 'success'
    })

})