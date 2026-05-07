import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TrialGuard } from '../auth/trial.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard, TrialGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Request() req, @Body() clientData: any) {
    return this.clientsService.create(req.user.id || req.user._id, clientData);
  }

  @Get()
  findAll(@Request() req) {
    return this.clientsService.findAll(req.user.id || req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.clientsService.findOne(id, req.user.id || req.user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateData: any) {
    return this.clientsService.update(id, req.user.id || req.user._id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.clientsService.remove(id, req.user.id || req.user._id);
  }
}
