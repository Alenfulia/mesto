//Класс, который отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ username, userinform, avatar }) {
    this._username = username;
    this._userinform = userinform;
    this._avatar = avatar
  }

  //Метод, который подставляет данные пользователя в форму при открытии
  getUserInfo () {
    const userInfo = {
      username: this._username.textContent,
      userinform: this._userinform.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  //Метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (data) {
    this._username.textContent = data.name;
    this._userinform.textContent = data.about;
    this._avatar.src = data.avatar;
    }
  }
