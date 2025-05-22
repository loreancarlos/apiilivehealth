import db from '../database/connection.js';

export class ClinicReviewService {
   async list() {
      return db('clinicReview')
         .select(
            'clinicReview.*',
            'user.name as userName',
            'clinic.fantasyName as clinicName'
         )
         .leftJoin('user', 'user.id', 'clinicReview.userId')
         .leftJoin('clinic', 'clinic.id', 'clinicReview.clinicId')
         .orderBy('clinicReview.createdAt', 'desc');
   }

   async create(data) {
      const [review] = await db('clinicReview')
         .insert({
            ...data,
            createdAt: db.fn.now(),
            updatedAt: db.fn.now()
         })
         .returning('*');

      // Update clinic rating
      const reviews = await db('clinicReview')
         .where({ clinicId: data.clinicId });

      const averageRating = reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;

      await db('clinic')
         .where({ id: data.clinicId })
         .update({
            rating: averageRating,
            reviewCount: reviews.length
         });

      return this.findById(review.id);
   }

   async findById(id) {
      return db('clinicReview')
         .select(
            'clinicReview.*',
            'user.name as userName',
            'clinic.fantasyName as clinicName'
         )
         .leftJoin('user', 'user.id', 'clinicReview.userId')
         .leftJoin('clinic', 'clinic.id', 'clinicReview.clinicId')
         .where('clinicReview.id', id)
         .first();
   }

   async update(id, data) {
      const [review] = await db('clinicReview')
         .where({ id })
         .update({
            ...data,
            updatedAt: db.fn.now()
         })
         .returning('*');

      if (!review) return null;

      // Update clinic rating
      const reviews = await db('clinicReview')
         .where({ clinicId: review.clinicId });

      const averageRating = reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;

      await db('clinic')
         .where({ id: review.clinicId })
         .update({
            rating: averageRating
         });

      return this.findById(review.id);
   }

   async delete(id) {
      const review = await this.findById(id);
      if (!review) return;

      await db('clinicReview')
         .where({ id })
         .delete();

      // Update clinic rating
      const reviews = await db('clinicReview')
         .where({ clinicId: review.clinicId });

      const averageRating = reviews.length ? 
         reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length : 0;

      await db('clinic')
         .where({ id: review.clinicId })
         .update({
            rating: averageRating,
            reviewCount: reviews.length
         });
   }
}