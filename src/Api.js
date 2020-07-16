export class Api {

    constructor(config , url) {
        this.url = url;
        this.headers = config.headers;
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then(id => {
                return this._getResponseData(id);
            })
    }

    renderInitialCards()  {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then(cards => {
                return this._getResponseData(cards);
            })
    }


    updateUserInfo(name, job) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${job}`
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addNewCard(title, link) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: `${title}`,
                link: `${link}`
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })

    }

    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            })

    }

    putLike(cardId){
        return fetch(`${this.url}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            })

    }

    deleteLike(cardId) {
        return fetch(`${this.url}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    sendNewAvatar (avatarLink) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: `${avatarLink}`
            })
        })
            .then(res => {
                return this._getResponseData(res);
            })

    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

}