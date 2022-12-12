const wsUri = " wss://echo-ws-service.herokuapp.com";

    const input = document.querySelector('.input');
    const btnMess = document.querySelector('.btn-mess');
    const btnGeo = document.querySelector('.btn-geo');
    const userMessages = document.querySelector('.user-messages');
    const serverMessages = document.querySelector('.server-messages');
    const wrapperChat =  document.querySelector('.wrapper-chat');

//Выводит сообщения
function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMessages.innerHTML += element;
	wrapperChat.scrollTop = wrapperChat.scrollHeight;
  }

// соединение
 let websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) {
		console.log("соединение...");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};
  
  //отправка сообщения
  btnMess.addEventListener('click', () => {
	let message = input.value;
    websocket.send(message);
	writeToScreen(`Ваше сообщение: ${message}`);
	input.value = ''

  });

  const error = () => {   // Функция  об ошибке
	let textErr0r = 'Невозможно получить ваше местоположение';
	writeToScreen(textErr0r);
  };
  
                                          
const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);    //  успешно получена геолокаця
  };
  
  btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('не поддерживается  браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, error);
	}
  });

  //удалить сообщения
  serverMessages.addEventListener('click', () => {
	userMessages.innerHTML = " ";
  });