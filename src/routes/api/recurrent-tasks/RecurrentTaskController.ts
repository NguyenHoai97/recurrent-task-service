import { findAll } from '@services/recurrent-tasks/RecurrentTaskService';
// import { findAll } from '@services/recurrentTaskService';
import { RecurrentTaskModel } from '@models/RecurrentTask';
import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';
<<<<<<< HEAD
import RecurrentTaskSchemaModels from '@schemas/recurrent-task/models';
import RecurrentTaskSchemaRequests from '@schemas/recurrent-task/requests';
import CommonSchemaRequests from '@schemas/common/requests';
import CommonSchemaResponses from '@schemas/common/responses';
import { TAGS } from '@schemas/common/tags';
import RecurrentTaskModel from '@models/RecurrentTask';
import NotFound404 from '@models/responses/NotFound404';

=======
>>>>>>> Add search api
class RecurrentTaskController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      {
        method: 'POST',
        url: '/',
        handler: this.createRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Creates a new recurrent task',
          body: RecurrentTaskSchemaRequests.CreateRecurrentTaskRequestBody,
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            400: CommonSchemaResponses.BadRequest400Response
          }
        }
      },
      {
        method: 'GET',
        url: '/:recurrentTaskId',
        handler: this.getRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Gets detailed information about a specific recurrent task',
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            401: CommonSchemaResponses.Unauthorized401Response,
            403: CommonSchemaResponses.ForbiddenAccess403Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'PUT',
        url: '/:recurrentTaskId',
        handler: this.updateRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Updates an existing recurrent task',
          body: RecurrentTaskSchemaRequests.UpdateRecurrentTaskRequestBody,
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            304: CommonSchemaResponses.NotModified304Response,
            400: CommonSchemaResponses.BadRequest400Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'DELETE',
        url: '/:recurrentTaskId',
        handler: this.deleteRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Deletes an existing recurrent task',
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            401: CommonSchemaResponses.Unauthorized401Response,
            403: CommonSchemaResponses.ForbiddenAccess403Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'GET',
        url: '/search',
        handler: this.searchRecurrentTasks,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Searches for recurrent tasks',
          querystring: CommonSchemaRequests.PaginationQueryParams,
          body: RecurrentTaskSchemaRequests.SearchRecurrentTaskRequestBody,
          response: {
            200: {
              description: 'A list of recurrent tasks',
              type: 'array',
              items: RecurrentTaskSchemaModels.RecurrentTask
            },
            400: CommonSchemaResponses.BadRequest400Response,
            401: CommonSchemaResponses.Unauthorized401Response
          }
        }
      },
      {
        method: 'GET',
        url: '/',
        handler: this.getRecurrentTasksByUserId,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Gets all recurrent tasks of a user',
          querystring: RecurrentTaskSchemaRequests.GetRecurrentTasksByUserIdQueryParams,
          response: {
            200: {
              description: 'A list of recurrent tasks',
              type: 'array',
              items: RecurrentTaskSchemaModels.RecurrentTask
            },
            400: CommonSchemaResponses.BadRequest400Response,
            401: CommonSchemaResponses.Unauthorized401Response
          }
        }
      }
    ];
  }

<<<<<<< HEAD
  private async createRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const newRecurrentTask = new RecurrentTaskModel(request.body);

    await newRecurrentTask.save();

    reply.send(newRecurrentTask);
  }

  private async getRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const recurrentTask = await RecurrentTaskModel.findById(request.params.recurrentTaskId);

    if (!recurrentTask) {
      return reply.status(404).send(NotFound404.generate(`Recurrent task with the requested ID '${request.params.recurrentTaskId}' was not found`));
    }

    reply.send(recurrentTask);
  }

  private async updateRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const recurrentTask = await RecurrentTaskModel.findById(request.params.recurrentTaskId);

    if (!recurrentTask) {
      return reply.status(404).send(NotFound404.generate(`Recurrent task with the requested ID '${request.params.recurrentTaskId}' was not found`));
    }

    Object.keys(request.body).forEach(fieldToUpdate => {
      recurrentTask[fieldToUpdate] = request.body[fieldToUpdate];
    });

    await recurrentTask.save();

    reply.send(recurrentTask);
  }

  private async deleteRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const recurrentTask = await RecurrentTaskModel.findById(request.params.recurrentTaskId);

    if (!recurrentTask) {
      return reply.status(404).send(NotFound404.generate(`Recurrent task with the requested ID '${request.params.recurrentTaskId}' was not found`));
    }

    await RecurrentTaskModel.findOneAndDelete({ _id: request.params.recurrentTaskId });

    reply.status(200);
=======
  private createRecurrentTask(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private getRecurrentTask(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private updateRecurrentTask(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private async deleteRecurrentTask(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): Promise<any> {
    const task = await RecurrentTaskModel.findById(
      request.params.recurrentTaskID
    );

    console.log('recuretnID', request.params.recurrentTaskID);
    if (!task) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Recurrent Task with the requested ID was not found'
      });
    }

    await RecurrentTaskModel.findOneAndDelete({
      _id: request.params.recurrentTaskID
    });

    reply.status(200).send();
>>>>>>> add delete RecurrentTask
  }

  private async searchRecurrentTasks(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): Promise<any> {
    const { recurrentTaskID } = request.params;
    console.log('id', recurrentTaskID);
    const { search, fields, offset, limit, sort } = request.query;
    const query = {
      query: {},
      search,
      fields,
      offset,
      limit,
      sort
    };

    if (search) query.search = search;
    if (fields) query.fields = fields.split(',');
    if (offset) query.offset = parseInt(offset, 10);
    if (limit) query.limit = parseInt(limit, 10);
    if (sort) query.sort = sort.split(',');
    Object.keys(request.query)
      .filter(
        q => ['search', 'fields', 'offset', 'limit', 'sort'].indexOf(q) === -1
      )
      .forEach(q => {
        if (['true', 'false'].includes(request.query[q])) {
          query.query[q] = JSON.parse(request.query[q]);
        } else {
          query.query[q] = request.query[q];
        }
      });
    console.log('demo', query);
    const { recurrentTasks, count } = await findAll(query);
    reply.status(200).send({
      statusCode: 200,
      messages: {
        recurrentTasks,
        metadata: {
          total: count
        }
      }
    });
  }

  private getRecurrentTasksByUserId(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }
}

export default new RecurrentTaskController().initialize;
