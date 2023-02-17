import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { TodoController } from './todo.controller';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/todo', method: RequestMethod.GET },
      { path: '/todo', method: RequestMethod.POST },
      // { path: '/users/:id', method: RequestMethod.PUT },
      // { path: '/users/:id', method: RequestMethod.DELETE },
    );
  }
}
