
//Класс, который отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._name = userName
    this._info = userInfo
  }

  //Метод, который подставляет данные пользователя в форму при открытии
  getUserInfo() {
    return {
      userNameValue: this._name.textContent,
      userInfoValue: this._info.textContent
    }
  }

  //Метод, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo( userNameValue, userInfoValue ) {
    this._name.textContent = userNameValue,
    this._info.textContent = userInfoValue
    }
  }
