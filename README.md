# flux-react-webpack-test
a little app to learn flux-react

### 监听store：
    把EventEmitter.prototype 挂载到TodoStore上,监听store的变化，并触发回调
```
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
```
## 运行
`npm install` <br>
`npm run dev`

