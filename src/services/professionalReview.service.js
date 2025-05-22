import db from '../database/connection.js';

export class ProfessionalReviewService {
  async list() {
    return db('professionalReview')
      .select(
        'professionalReview.*',
        'user.name as userName',
        'professional.name as professionalName'
      )
      .leftJoin('user', 'user.id', 'professionalReview.userId')
      .leftJoin('professional', 'professional.id', 'professionalReview.professionalId')
      .orderBy('professionalReview.createdAt', 'desc');
  }

  async create(data) {
    const [review] = await db('professionalReview')
      .insert({
        ...data,
        createdAt: db.fn.now(),
        updatedAt: db.fn.now()
      })
      .returning('*');

    // Update professional rating
    const reviews = await db('professionalReview')
      .where({ professionalId: data.professionalId });

    const averageRating = reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;

    await db('professional')
      .where({ id: data.professionalId })
      .update({
        rating: averageRating,
        reviewCount: reviews.length
      });

    return this.findById(review.id);
  }

  async findById(id) {
    return db('professionalReview')
      .select(
        'professionalReview.*',
        'user.name as userName',
        'professional.name as professionalName'
      )
      .leftJoin('user', 'user.id', 'professionalReview.userId')
      .leftJoin('professional', 'professional.id', 'professionalReview.professionalId')
      .where('professionalReview.id', id)
      .first();
  }

  async update(id, data) {
    const [review] = await db('professionalReview')
      .where({ id })
      .update({
        ...data,
        updatedAt: db.fn.now()
      })
      .returning('*');

    if (!review) return null;

    // Update professional rating
    const reviews = await db('professionalReview')
      .where({ professionalId: review.professionalId });

    const averageRating = reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;

    await db('professional')
      .where({ id: review.professionalId })
      .update({
        rating: averageRating
      });

    return this.findById(review.id);
  }

  async delete(id) {
    const review = await this.findById(id);
    if (!review) return;

    await db('professionalReview')
      .where({ id })
      .delete();

    // Update professional rating
    const reviews = await db('professionalReview')
      .where({ professionalId: review.professionalId });

    const averageRating = reviews.length ? 
      reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length : 0;

    await db('professional')
      .where({ id: review.professionalId })
      .update({
        rating: averageRating,
        reviewCount: reviews.length
      });
  }
}