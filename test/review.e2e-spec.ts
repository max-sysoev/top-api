import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, Logger} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {CreateReviewDto} from "../src/review/dto/create-review.dto";
import {Types, disconnect} from "mongoose";
import {REVIEW_NOT_FOUND} from "../src/review/review.constants";
import {AuthDto} from "../src/auth/dto/auth.dto";

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Title',
    description: 'Test Description',
    rating: 5,
    productId
};

const loginDto: AuthDto = {
    login: 'max@magnify.ventures',
    password: 'p@$$w0rd'
}

describe('ReviewController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const {body} = await request(app.getHttpServer()).post('/auth/login')
            .send(loginDto);

        token = 'Bearer ' + body.access_token;
    });

    it('/review/create (POST) - success', async() => {
        return await request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then(({body}: request.Response) => {
                // console.log(body);
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/review/create (POST) - failure', () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send({...testDto, rating: 0})
            .expect(400)
            // .expect(200)
            .then(({body}: request.Response) => {
                console.log('body', body);
            });
    });

    it('/review/byProduct/:productId (GET) - success',  async() => {
        return await request(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            // .expect(200)
            .then(({body}: request.Response) => {
                console.log('body', productId, body);
                expect(body.length).toBe(1);
            })
    });

    it('/review/byProduct/:productId (GET) - failure',  async() => {
        return await request(app.getHttpServer())
            .get('/review/byProduct/' + new Types.ObjectId().toHexString())
            // .expect(200)
            .then(({body}: request.Response) => {
                expect(body.length).toBe(0);
            })
    });

    it('/review/:id (DELETE) - success',  async() => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .set('Authorization', token)
            .expect(200);
    });

    it('/review/:id (DELETE) - failure',  async() => {
        return request(app.getHttpServer())
            .delete('/review/' + new Types.ObjectId().toHexString())
            .set('Authorization', token)
            .expect(404, {
                statusCode: 404,
                message: REVIEW_NOT_FOUND
            });
    });

    afterAll(() => {
        app.close();
    })
});
