
//класс Section, который отвечает за отрисовку элементов на странице
export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;

    this._container = container;
  }

  //Метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }

  //Метод, который принимает DOM-элемент и добавляет его в конец контейнера
  addItem(element) {
    this._container.append(element);
  }

  //Метод, который принимает DOM-элемент и добавляет его в начало контейнера
  addNewItem(element) {
    this._container.prepend(element);
  }
}
