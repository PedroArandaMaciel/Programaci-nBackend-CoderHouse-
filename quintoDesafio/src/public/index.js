let form = document.getElementById('productForm')

form.addEventListener('submit',e=>{
    e.preventDefault();
    let formData = new FormData(form);
    if(form.price.value && form.name.value){
        fetch('/productos',{
            method: 'POST',
            body: formData,
        }).then(result => result.json).then(result => console.log(result))
    }else{
        console.log("Faltan completar campos")
    }
})