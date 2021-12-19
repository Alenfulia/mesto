//Класс, который отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  //Метод, который отвечает за отрисовку всех элементов
  renderItems(data) {
    data.forEach(item => this._renderer(item))
  }

  //Метод, который принимает DOM-элемент и добавляет его в начало контейнера
  appendItem(element) {
    this._container.append(element);
  }

  prependItem(item) {
    this._container.prepend(item);
  }

}
