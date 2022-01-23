import ImageService from '../services/image.service';

describe('suite description', () => {
  let image_service: ImageService = new ImageService();

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
});
