import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('api/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Req() req: any, @Body() createGroupDto: CreateGroupDto) {
      try {
        const { name, description } = createGroupDto;
        const userId = req.user?.userId;

        if (!userId) {
          return new UnauthorizedException('User not authenticated');
        }

        const group = await this.groupsService.create(createGroupDto, userId);

        return { message: 'Group created successfully', group };
      } catch (error: any) {
        throw new Error(error.message || 'Internal server error');
      }
  }

  @Get()
  async findAll(@Req() req: any) {
      try {
      const userId = req.user?.userId;

      if (!userId) {
        return new UnauthorizedException('User not authenticated');
      }

      const groups = await this.groupsService.getGroupsService(userId);

      return { groups };
    } catch (error: any) {
      throw new Error(error.message || 'Internal server error');
    }
  }

  @Post('/:name/join')
  async joinGroup (@Req() req: any , @Param('name') groupName: string) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return new UnauthorizedException('User not authenticated');
    }

    const group = await this.groupsService.joinGroupService(groupName, userId);

    return { message: 'Joined group successfully', group };
  } catch (error: any) {
    throw new Error(error.message || 'Internal server error');
  }
};
}
