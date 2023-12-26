import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoKeyLocalstorage } from '../models/enums/todoKeyLocalstorage';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todoState = signal<Array<Todo>>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todoState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, done));
        }
      });

      this.saveTodosInLocalStorage();
    }
  }

  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todoState());
    todos && localStorage.setItem(TodoKeyLocalstorage.TODO_LIST, todos);
  }
}
