import { setSeederFactory } from 'typeorm-extension';
import { PgsqlProductReviewM } from '../../entities/product-review.entity';

export const ProductReviewFactory = setSeederFactory(
  PgsqlProductReviewM,
  async (faker) => {
    const review = new PgsqlProductReviewM();

    review.rating = faker.number.int({ min: 1, max: 5 });
    review.comment = faker.lorem.sentences({ min: 1, max: 3 });
    review.created_at = new Date();
    review.updated_at = new Date();

    return review;
  },
);
