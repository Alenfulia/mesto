//Класс, который отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ username, userinform, avatar, userId }) {
    this._username = username;
    this._userinform = userinform;
    this._avatar = avatar;
    this._userId = userId;
  }

  //Метод, который подставляет данные пользователя в форму при открытии
  getUserInfo () {
    const userInfo = {
      username: this._username.textContent,
      userinform: this._userinform.textContent,
      avatar: this._avatar.src,
      userId : this._userId
    }
    return userInfo;
  }

  //Получаем id-пользователя
  getUserId() {
    return this._userId;
  }

  //Метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (data) {
    this._username.textContent = data.name;
    this._userinform.textContent = data.about;
    this._avatar.src = data.avatar;
    this._userId = data._id;
  }

  //Изменяем аватар пользователя
  setAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
