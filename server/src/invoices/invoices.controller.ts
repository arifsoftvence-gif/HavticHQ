import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TrialGuard } from '../auth/trial.guard';

@Controller('invoices')
@UseGuards(JwtAuthGuard, TrialGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('stats')
  getStats(@Request() req) {
    return this.invoicesService.getStats(req.user.id || req.user._id);
  }

  @Post()
  create(@Request() req, @Body() invoiceData: any) {
    return this.invoicesService.create(req.user.id || req.user._id, invoiceData);
  }

  @Post('ai-parse')
  parseAI(@Body('input') input: string) {
    return this.invoicesService.parseAIInput(input);
  }

  @Get()
  findAll(@Request() req) {
    return this.invoicesService.findAll(req.user.id || req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.invoicesService.findOne(id, req.user.id || req.user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateData: any) {
    return this.invoicesService.update(id, req.user.id || req.user._id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.invoicesService.remove(id, req.user.id || req.user._id);
  }
}
