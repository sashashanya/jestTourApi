import * as supertest from "supertest"
const request = supertest("https://practice-react.sdetunicorns.com/api/test")
describe('UPLOAD', () => {
    it('upload single document',async () => {
        await request
        .post('/upload/single')
        
        
    });
});