import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Res() response, @Body() todo: Todo) {
    const newTodo = await this.todoService.createTodo(todo);
    return response.status(HttpStatus.CREATED).json({
      newTodo,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const todos = await this.todoService.findAll();
    return response.status(HttpStatus.OK).json({
      todos,
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const todos = await this.todoService.findOne(id);
    return response.status(HttpStatus.OK).json({
      todos,
    });
  }
}
