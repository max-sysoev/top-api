import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {UserModel} from "../user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: ConfigService){
        super({ //information about these params can be red on passport website
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    /*
    Here we put only email in params because we encrypted only email in our JWT token
     */
    async validate({email}: Pick<UserModel, 'email'>){
        return email;
    }
}