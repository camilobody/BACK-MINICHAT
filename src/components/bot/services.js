import fetch from "node-fetch";
import serviceMessage from "../messages/services.js"

const services = {};
const nameBot = 'new_bot'; // variables de entorno
let token = '';

services.getPing = () => {
    fetch(
        `http://localhost:3000/api/v1/admin/ping`,
        {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        }
    )
    .then((response) => response.json())
    .then((res) => {
        // console.log(res);
        if (res.message !== 'Pong'){
            console.log('cambio token');
            services.getToken();
        }else{
            console.log('no cambio token');
        }
    })
    .catch((err) => {
        console.log("Something went wrong!", err);
    });
};

services.getToken = () => {
    fetch(
        `http://localhost:3000/api/v1/auth/login/basic/default`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "email": "jwro_kicfq27@jyplo.com", // variables de entorno
                "password": "123456", // variables de entorno
            }),
        }
    )
    .then((response) => response.json())
    .then(async (res) => {
        // console.log(res);
        if (res.message === 'Login successful'){
            token = `Bearer ${res.payload.jwt}`;
        }
    })
    .catch((err) => {
        console.log("Something went wrong!", err);
    });
}

services.postMessage = (message, id_member) => {
    fetch(
        `http://localhost:3000/api/v1/bots/${nameBot}/converse/${id_member}/secured?include=nlu`,
        {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                "type": "text",
                "text": message.content,
            }),
        }
    )
    .then((response) => response.json())
    .then(async (res) => {
        // console.log(res);
        if (res.responses){
            const response = res.responses;
            for (let index = 0; index < response.length; index++) {
                const datecol = new Date().toDateString('es-co');
                const hourcol = new Date().toLocaleTimeString('es-co', { hour12: false });
                const dateUTC = new Date(`${datecol} ${hourcol} UTC`);
                const datenow = dateUTC.toISOString();
                const milliseconds = new Date().getTime();
                const datenowWithMilliseconds = datenow.replace('000Z', milliseconds.toString().substring(milliseconds.toString().length -3));
                const messageBot =
                {
                    "author": "bot",
                    "author_name": "bot",
                    "author_type": "back",
                    "content": response[index].text,
                    "create_at": datenowWithMilliseconds,
                    "id_channel": message.id_channel,
                    "id_meet": message.id_meet,
                    "type": "text"
                }
                await serviceMessage.insertMessage(messageBot)
                
            }
        }else{
            console.log('---------------ERROR----------------------');
            console.log(res);
        }
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
    });
};

export default services;
