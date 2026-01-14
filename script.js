// Получаем элементы HTML
const idInstance = document.getElementById('idInstance');
const apiToken = document.getElementById('apiToken');

const phoneMessage = document.getElementById('phoneMessage');
const message = document.getElementById('message');

const phoneFile = document.getElementById('phoneFile');
const fileUrl = document.getElementById('fileUrl');

const response = document.getElementById('response');

// Функция для получения idInstance и токена
function creds() {
    return {
        id: idInstance.value.trim(),
        token: apiToken.value.trim()
    };
}

// Функция для отображения ответа в поле
function show(data) {
    response.value = JSON.stringify(data, null, 2);
}

// Методы GREEN-API
async function getSettings() {
    const { id, token } = creds();
    const r = await fetch(`https://api.green-api.com/waInstance${id}/getSettings/${token}`);
    show(await r.json());
}

async function getStateInstance() {
    const { id, token } = creds();
    const r = await fetch(`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`);
    show(await r.json());
}

async function sendMessage() {
    const { id, token } = creds();
    const r = await fetch(
        `https://api.green-api.com/waInstance${id}/sendMessage/${token}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chatId: `${phoneMessage.value}@c.us`,
                message: message.value
            })
        }
    );
    show(await r.json());
}

async function sendFileByUrl() {
    const { id, token } = creds();
    const r = await fetch(
        `https://api.green-api.com/waInstance${id}/sendFileByUrl/${token}`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                chatId: `${phoneFile.value}@c.us`,
                urlFile: fileUrl.value,
                fileName: "file"
            })
        }
    );
    show(await r.json());
}
