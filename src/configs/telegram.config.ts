import {ITelegramOptions} from "../telegram/telegram.interface";
import {ConfigService} from "@nestjs/config";

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
    const token = configService.get('TELEGRAM_TOKEN');
    if(!token){
        throw new Error('TELEGRAM_TOKEN is not defined')
    }
    return {
        token,
        chatId: configService.get('CHAT_ID') ?? ''
    };
}