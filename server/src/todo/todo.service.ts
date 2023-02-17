import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) { }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  async createTodo(todo: Todo): Promise<Todo> {
    const newTodo = new Todo();
    newTodo.title = todo.title;
    newTodo.isCompleted = todo.isCompleted;
    return newTodo.save();
  }
}
