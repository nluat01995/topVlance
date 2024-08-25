import { Module } from '@nestjs/common';
import { BidService } from './bids.service';
import { BidController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { PostProject } from 'src/post-project/entities/post-project.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bid, PostProject, User])],
  controllers: [BidController],
  providers: [BidService],
})
export class BidsModule { }
