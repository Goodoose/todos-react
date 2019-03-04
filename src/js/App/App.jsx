import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todosTemp: [],
      inputValue: '',
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerChangeTodo = this.handlerChangeTodo.bind(this);
    this.handlerChangeImage = this.handlerChangeImage.bind(this);
    this.handlerChangeDelete = this.handlerChangeDelete.bind(this);


    this.buttonAll = this.buttonAll.bind(this);
    this.buttonActive = this.buttonActive.bind(this);
    this.buttonCompleted = this.buttonCompleted.bind(this);
    this.buttonClearCompleted = this.buttonClearCompleted.bind(this);
  }

  handlerChange(newTodo) {
    if (newTodo === 'ENTER') {
      this.setState(({ todos, inputValue }) => {
        const newTodos = [...todos, { content: inputValue, imageUrl: '../../images/unchecked.svg' }];
        return {
          todos: newTodos,
          todosTemp: newTodos,
          inputValue: '',
        };
      });
    } else {
      this.setState(({ inputValue: newTodo }));
    }
  }

  handlerChangeTodo(newTodo, id) {
    this.setState((prevState) => {
      const { todos } = prevState;
      todos[id].content = newTodo;
      return {
        todos,
        todosTemp: todos,
      };
    });
  }

  handlerChangeImage(id) {
    this.setState((prevState) => {
      const { todos } = prevState;
      const imgUnchecked = '../../images/unchecked.svg';
      const imgChecked = '../../images/checked.svg';
      todos[id].imageUrl = todos[id].imageUrl === imgUnchecked ? imgChecked : imgUnchecked;
      return {
        todos,
        todosTemp: todos,
      };
    });
  }

  handlerChangeDelete(id) {
    this.setState(({ todos }) => {
      const newTodos = todos.filter((todo, index) => index !== id);
      return {
        todos: newTodos,
        todosTemp: newTodos,
      };
    });
  }

  buttonAll() {
    this.setState(({ todosTemp }) => ({ todos: todosTemp }));
  }

  buttonActive() {
    this.setState(({ todosTemp }) => ({
      todos: todosTemp.filter(img => img.imageUrl === '../../images/unchecked.svg'),
    }));
  }

  buttonCompleted() {
    this.setState(({ todosTemp }) => ({
      todos: todosTemp.filter(img => img.imageUrl === '../../images/checked.svg'),
    }));
  }

  buttonClearCompleted() {
    this.setState(({ todosTemp }) => {
      const newTodos = todosTemp.filter(img => img.imageUrl === '../../images/unchecked.svg');
      return {
        todos: newTodos,
        todosTemp: newTodos,
      };
    });
  }

  renderItems() {
    const { todos } = this.state;
    return (
      todos.map((todo, index) => (
        <li key={index} className="container__item">
          <hr className="container__line" />
          <div className="container__content">
            <a href="#" onClick={() => this.handlerChangeImage(index)}>
              <img alt="checked" className="container__image--checked" src={todo.imageUrl} />
            </a>
            <input
              className="container__input--item"
              type="text"
              value={todo.content}
              onChange={event => this.handlerChangeTodo(event.target.value, index)}
            />
            <a href="#" className="container__image--hide" onClick={() => this.handlerChangeDelete(index)}>
              <img alt="close" className="container__image--close" src="../../images/close.svg" />
            </a>
          </div>
        </li>
      ))
    );
  }

  render() {
    const { todosTemp, inputValue } = this.state;
    const todosRender = this.renderItems();
    const counterItems = todosTemp.filter(img => img.imageUrl === '../../images/unchecked.svg').length;

    return (
      <div>
        <div className="headline">todos</div>
        <div className="container">
          <div>
            <input
              className="container__input"
              type="text"
              name="inputValue"
              placeholder="What needs to be done?"
              value={inputValue}
              onKeyDown={event => event.key === 'Enter'
                && this.handlerChange('ENTER')
                && event.preventDefault()}
              onChange={event => this.handlerChange(event.target.value)}
            />
          </div>
          <ul className="container_list">
            {todosRender}
          </ul>
          <hr className="container__line" />
          <div className="container__footer">
            <div className="container__counter">
              {counterItems}
              {' '}
              {counterItems === 1 ? 'item left' : 'items left'}
            </div>

            <div className="container__buttons--list">
              <button
                type="button"
                name="All"
                className="container__button"
                onClick={() => this.buttonAll()}
              >
                All
              </button>

              <button
                type="button"
                className="container__button"
                onClick={() => this.buttonActive()}
              >
                Active
              </button>

              <button
                type="button"
                className="container__button"
                onClick={() => this.buttonCompleted()}
              >
                Completed
              </button>
            </div>
            <div className="container__button--completed">
              <button
                type="button"
                className="container__button"
                onClick={() => this.buttonClearCompleted()}
              >
                Clear completed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
