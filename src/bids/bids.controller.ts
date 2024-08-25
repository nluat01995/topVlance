import { Controller, Post, Get, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BidService } from './bids.service';

@Controller('posts/:postId/bids')
export class BidController {
  constructor(private readonly bidService: BidService) { }

  @Post()
  async createBid(
    @Param('postId') postId: number,
    @Body('userId') userId: number,
    @Body('bidAmount') bidAmount: number,
  ) {
    return this.bidService.createBid(postId, userId, bidAmount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':bidId')
  async updateBid(
    @Param('bidId') bidId: number,
    @Body('bidAmount') bidAmount: number,
  ) {
    return this.bidService.updateBid(bidId, bidAmount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':bidId')
  async deleteBid(@Param('bidId') bidId: number) {
    await this.bidService.deleteBid(bidId);
    return { message: 'Bid deleted successfully' };
  }

  @Get()
  async getBidsForPost(@Param('postId') postId: number) {
    return this.bidService.getBidsForPost(postId);
  }

  @Get(':bidId')
  async getBidById(@Param('bidId') bidId: number) {
    return this.bidService.getBidById(bidId);
  }
}
