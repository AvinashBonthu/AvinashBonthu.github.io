var socket = io();
const l = console.log
function getEl(id) {
    return document.getElementById(id)
}

function scrollToBottom() {
	var textarea = document.getElementById('editor');
	textarea.scrollTop = textarea.scrollHeight;
}
scrollToBottom();
function scrollToBottom1() {
	var textarea = document.getElementById('input_text');
	textarea.scrollTop = textarea.scrollHeight;
}
scrollToBottom1();
function scrollToBottom2() {
	var textarea = document.getElementById('output_text');
	textarea.scrollTop = textarea.scrollHeight;
}
scrollToBottom2();
function scrollToRight() {
	var textarea = document.getElementById('editor');
	textarea.scrollLeft = textarea.scrollWidth;
}
scrollToRight();



socket.on('connect', () => {
	console.log('connected to server');
	let searchQuery = window.location.search.substring(1);
	let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g,' ').replace(/=/g,'":"') + '"}');

	socket.emit('join', params, function(err){
		if(err){
			alert(err);
			window.location.href = '/join.html';
		}
		else {
			console.log('No error');
		}
	})
});

const editor = getEl("editor")
const output = getEl("output_text")
const input = getEl("input_text")
const language = getEl("language")

language.addEventListener('change', (evt3) => {
	const text = language.value
	socket.send({msg:text, id:3})
})

editor.addEventListener('input', (evt) => {
    const text = editor.value
    	socket.send({msg:text, id:0})  
})

output.addEventListener("input", (evt1) =>{
	const text = output.value
	socket.send({msg:text, id:2})
	
})
input.addEventListener('input', (evt2) => {
	const text = input.value
	socket.send({msg:text, id:1})

})
socket.on('message', (data) => {
	if(data.id == 0)
    	editor.value = data.msg
	else if(data.id == 1)
		input.value = data.msg
	else if(data.id == 2) 
		output.value = data.msg
	else if(data.id == 3)
		language.value = data.msg
	scrollToBottom();
	scrollToBottom1();
	scrollToBottom2();
	scrollToRight();
})
