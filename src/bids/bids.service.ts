import { Injectable, NotFoundException, BadRequestException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { PostProject } from 'src/post-project/entities/post-project.entity';


@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
    @InjectRepository(PostProject)
    private readonly postRepository: Repository<PostProject>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Tạo giá thầu mới
  async createBid(postId: number, userId: number, bidAmount: number) {
    const postProject = await this.postRepository.findOne({ where: { id: postId } });
    if (!postProject) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const highestBid = await this.bidRepository.findOne({
      where: { postProject: { id: postId } },
      order: { bidAmount: 'DESC' },
    });

    if (highestBid && bidAmount <= highestBid.bidAmount) {
      throw new BadRequestException('Bid amount must be higher than current highest bid');
    }

    const newBid = await this.bidRepository.create({ bidAmount, postProject, user });
    return this.bidRepository.save(newBid);
  }

  // Cập nhật giá thầu
  async updateBid(bidId: number, bidAmount: number): Promise<Bid> {
    const bid = await this.bidRepository.findOne({ where: { id: bidId }, relations: ['post'] });
    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    const highestBid = await this.bidRepository.findOne({
      where: { postProject: { id: bid.postProject.id }, id: bidId },
      order: { bidAmount: 'DESC' },
    });

    if (highestBid && bidAmount <= highestBid.bidAmount) {
      throw new BadRequestException('Bid amount must be higher than current highest bid');
    }

    bid.bidAmount = bidAmount;
    return this.bidRepository.save(bid);
  }

  // Xóa giá thầu
  async deleteBid(bidId: number): Promise<void> {
    const bid = await this.bidRepository.findOne({ where: { id: bidId } });
    if (!bid) {
      throw new NotFoundException('Bid not found');
    }
    await this.bidRepository.remove(bid);
  }

  // Lấy danh sách các giá thầu của bài post
  async getBidsForPost(postId: number): Promise<Bid[]> {
    return this.bidRepository.find({
      where: { postProject: { id: postId } },
      order: { bidAmount: 'DESC' },
      relations: ['user'],
    });
  }

  // Lấy giá thầu theo ID
  async getBidById(bidId: number): Promise<Bid> {
    const bid = await this.bidRepository.findOne({ where: { id: bidId }, relations: ['user', 'post'] });
    if (!bid) {
      throw new NotFoundException('Bid not found');
    }
    return bid;
  }
}
