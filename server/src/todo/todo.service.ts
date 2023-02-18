import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) { }

  async findAll(userId): Promise<Todo[]> {
    return this.todoModel.findAll({
      where: {
        userId,
      },
    });
  }

  findOne(id: number, userId: number): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  delete(id: number, userId: number): Promise<number> {
    return this.todoModel.destroy({
      where: {
        id,
        userId,
      },
    });
  }

  update(id: number, todo: Todo, userId: number): Promise<number[]> {
    const updatedTodo = new Todo();
    updatedTodo.title = todo.title;
    updatedTodo.isCompleted = todo.isCompleted;
    return this.todoModel.update(todo, {
      where: {
        id,
        userId,
      },
    });
  }

  async createTodo(todo: Todo, userId: number): Promise<Todo> {
    const newTodo = new Todo();
    newTodo.title = todo.title;
    newTodo.userId = userId;
    newTodo.isCompleted = todo.isCompleted;
    return newTodo.save();
  }
}
