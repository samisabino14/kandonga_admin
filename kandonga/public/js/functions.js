
import axios from 'axios';

const id = document.getElementById('id');
const email = document.getElementById('email');
const nome = document.getElementById('name');
const phone = document.getElementById('phone');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');


addBtn.addEventListener('click', event => {

    event.preventDefault();

    axios({
        method: 'post',
        url: '/kandonga',
        data: {
            email: email.value,
            name: nome.value,
            phone: phone.value,
        }
    })
})


updateBtn.addEventListener('click', e => {

    e.preventDefault();
    
    axios({
        method: 'put',
        url: '/kandonga/riders',
        data: {
            id: id.value,
            email: email.value,
            name: nome.value,
            phone: phone.value,
        }
    })
});


removeBtn.addEventListener('click', e => {

    e.preventDefault();
    
    axios({
        method: 'delete',
        url: '/kandonga/riders',
        data: {
            id: id.value
        }
    })
});


