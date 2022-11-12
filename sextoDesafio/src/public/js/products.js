const socket = io();  //conexion desde el cliente

const productsRealTime = document.getElementById('productsRealTime');

socket.on('savedProducts', data => {
    const productsDiv = document.getElementById('products')
    let products = ''
    data.forEach(pdt => {
        products += `<td>${pdt.name}</td><td>$${pdt.price}</td>`
    });
    productsDiv.innerHTML = products
})