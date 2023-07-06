const deleteBtn = document.querySelectorAll('.deleteMsg');

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteMsg)
});

async function deleteMsg(){
    const messageId = this.parentNode.dataset.id
    try{
        const response = await fetch('message/deleteMessage', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'messageIdFromJSFile': messageId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
