const express = require('express');
const Product = require('../models/Product');
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const options = { page: parseInt(page), limit: parseInt(limit), sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {} };
        const filter = query ? { $or: [{ category: query }, { status: query === 'true' }] } : {};

        const result = await Product.paginate(filter, options);
        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
