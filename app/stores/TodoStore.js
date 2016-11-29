import EventEmitter from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';
import uuid from 'uuid';

// assign方法把EventEmitter.prototype 挂载到TodoStore上
const TodoStore = assign({}, EventEmitter.prototype, {
  todos: [{ id: uuid.v4(), content: 'first one' }, { id: uuid.v4(), content: 'second one' }],
  getAll() {
    return this.todos;
  },
  addTodo(todo) {
    this.todos.push(todo);
  },
  // filter()方法不改变原数组，产生一个新的数组
  deleteTodo(id) {
    this.todos = this.todos.filter(item => item.id !== id);
  },
  emitChange() {
    this.emit('change');
  },
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.removeChangeListener('change', callback);
  }
});
/* const TodoStore = {
	todos: [{ id: uuid.v4(), content: 'first one' }, { id: uuid.v4(), content: 'second one' }],
	getAll() {
		return this.todos;
	},
	addTodo(todo) {
		this.todos.push(todo);
	},
	deleteTodo(id) {
		this.todos.filter(item => item.id !== id);
	}
}; */


AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'CREATE_TODO':
      TodoStore.addTodo(action.todo);
      // 发送广播
      TodoStore.emitChange();
      break;
    case 'DELETE_TODO':
      TodoStore.deleteTodo(action.id);
      TodoStore.emitChange();
      break;
    default:
  }
});

export default TodoStore;
