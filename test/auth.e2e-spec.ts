import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, Logger} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {CreateReviewDto} from "../src/review/dto/create-review.dto";
import {Types, disconnect} from "mongoose";
import {REVIEW_NOT_FOUND} from "../src/review/review.constants";
import {AuthDto} from "../src/auth/dto/auth.dto";
import {USER_NOT_FOUND, WRONG_PASSWORD} from "../src/auth/auth.constants";

const loginDto: AuthDto = {
    login: 'max@magnify.ventures',
    password: 'p@$$w0rd'
}

describe('ReviewController (e2e)', () => {
    let app: INestApplication;
    let accessToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

    });

    it('/auth/login (POST) - success', async () => {
        return await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({body}: request.Response) => {
                accessToken = body.access_token;
                expect(accessToken).toBeDefined();
            });
    });

    it('/auth/login (POST) - wrong login', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, login: 'wrong@email.com'})
            .expect(401, {
                statusCode: 401,
                error: 'Unauthorized',
                message: USER_NOT_FOUND
            });
    });

    it('/auth/login (POST) - wrong password', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({...loginDto, password: '1'})
            // .then(({body}: request.Response) => {
            //     console.log(body);
            // });
            .expect(401, {
                statusCode: 401,
                error: 'Unauthorized',
                message: WRONG_PASSWORD
            });
    });

    afterAll(() => {
        app.close();
    })
});
