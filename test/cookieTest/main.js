let cookieName = "KOOKY_INSANE"
let expirationDays = 7;


let expirationTimeMS = 1000*60*60*24*expirationDays; // [expirationDays]Days in ms

function setCookie(name, data){
    const date = new Date(Date.now()+expirationTimeMS);
    dateUTC = date.toUTCString();

    document.cookie = name+"="+data+"; expires="+dateUTC;
}

function readCookie(name){
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

function rmCookie(name){
    const date = new Date(0);
    dateUTC = date.toUTCString();
    document.cookie = name+"="+dateUTC+"; expires="+dateUTC;
}

setCookie(cookieName, "&*H(PJIOP&G*OFTDR^E");
console.log(readCookie(cookieName));
// rmCookie(cookieName);
