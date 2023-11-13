import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Logger,
    UsePipes,
    ValidationPipe, UseGuards
} from '@nestjs/common';
import {CreateReviewDto} from "./dto/create-review.dto";
import {ReviewService} from "./review.service";
import {REVIEW_NOT_FOUND} from "./review.constants";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {UserEmail} from "../decorators/user-email.decorator";
import {IdValidationPipe} from "../pipes/ad-validation.pipe";
import {TelegramService} from "../telegram/telegram.service";

@Controller('review')
export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService,
        private readonly telegramService: TelegramService
    ) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto);
    }
    @UsePipes(new ValidationPipe())
    @Post('notify')
    async notify(@Body() dto: CreateReviewDto) {
        const message = `Name: ${dto.name}\n` +
            `Title: ${dto.title}\n` +
            `Description: ${dto.description}\n` +
            `Rating: ${dto.rating}\n` +
            `ProductId: ${dto.productId}`;
        return this.telegramService.sendMessage(message);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdValidationPipe) productId: string/*, @UserEmail() email: string*/) {
        //console.log(email); // shows how we used param decorator
        return this.reviewService.findByProductId(productId);
    }

}
