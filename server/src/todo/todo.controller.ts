import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Res() response, @Body() todo: Todo) {
    const newTodo = await this.todoService.createTodo(todo, response.user.id);
    return response.status(HttpStatus.CREATED).json({
      newTodo,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const todos = await this.todoService.findAll(response.user.id);
    return response.status(HttpStatus.OK).json({
      todos,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() todo: Todo) {
    const number = await this.todoService.update(id, todo, response.user.id);
    return response.status(HttpStatus.OK).json({
      number,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const number = await this.todoService.delete(id, response.user.id);
    return response.status(HttpStatus.OK).json({
      number,
    });
  }
}
