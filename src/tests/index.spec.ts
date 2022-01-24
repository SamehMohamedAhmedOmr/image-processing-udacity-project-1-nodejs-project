import ImageService from '../services/image.service';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('suite description', () => {
  const image_service: ImageService = new ImageService();

  it('function return 404', async () => {
    const test = await image_service.imageProcessing('test.png', '100', '100');
    expect(test.code).toEqual(404);
  });

  it('function return 200', async () => {
    const test = await image_service.imageProcessing(
      'image-4.jpg',
      '100',
      '100'
    );
    expect(test.code).toEqual(200);
  });

  it('Test API RESPONSE TO 200', async () => {
    const response = await request.get(
      '/api/images?image=image-4.jpg&width=1000&height=500'
    );
    expect(response.status).toBe(200);
  });
});
