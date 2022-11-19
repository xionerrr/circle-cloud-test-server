import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Task, User } from 'src/entities'
import { I_GetData } from 'src/models'

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getMyInfo(userId: number): Promise<I_GetData<User>> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
        relations: ['avatar'],
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          active: true,
          updatedAt: true,
          avatar: {
            url: true,
            fileName: true,
            mimetype: true,
          },
        },
      })

      return {
        message: 'Successfully fetched my user information',
        data: user,
        timestamp: new Date(),
      }
    } catch (error) {
      throw new ForbiddenException({
        message: {
          text: error.message,
          status: error.status,
        },
      })
    }
  }

  async getMyTasks(userId: number): Promise<I_GetData<Task[]>> {
    try {
      const tasks = await this.taskRepository.find({
        where: {
          creator: {
            id: userId,
          },
        },
      })

      return {
        message: 'Successfully fetched my tasks',
        data: tasks,
        timestamp: new Date(),
      }
    } catch (error) {
      throw new ForbiddenException({
        message: {
          text: error.message,
          status: error.status,
        },
      })
    }
  }
}
