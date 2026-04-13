import con from "../config/db.js";

// get Store Details
// GET /api/owner/store
export const getOwnerStoreDetails = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const result = await con.query(`
      SELECT 
        s.id,
        s.name,
        s.email,
        s.address,
        s.image,
        s.description,

        COALESCE(AVG(r.rating), 0) AS average_rating,
        COUNT(r.id) AS total_ratings

      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id

      WHERE s.owner_id = $1
      GROUP BY s.id
    `, [ownerId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found for this owner"
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// all Users who rated that store
// GET /api/owner/store/ratings
export const getStoreRatingsForOwner = async (req, res) => {
  try {
    const id = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const storeRes = await con.query(
      "SELECT id, name FROM stores WHERE owner_id = $1",
      [id]
    );

    if (storeRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found for this owner",
      });
    }

    const storeId = storeRes.rows[0].id;

    const result = await con.query(
      `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.address,
        r.rating,
        r.created_at
      FROM ratings r
      JOIN users u ON u.id = r.user_id
      WHERE r.store_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3
      `,
      [storeId, limit, offset]
    );

    const countRes = await con.query(
      "SELECT COUNT(*) FROM ratings WHERE store_id = $1",
      [storeId]
    );

    const total = parseInt(countRes.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// count
// GET /api/owner/rating-summary
export const getRatingSummary = async (req, res) => {
  try {
    const id = req.user.id;

    const storeRes = await con.query(
      "SELECT id FROM stores WHERE owner_id = $1",
      [id]
    );

    if (storeRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const storeId = storeRes.rows[0].id;

    // total users who rated
    const totalUsers = await con.query(
      "SELECT COUNT(*) FROM ratings WHERE store_id = $1",
      [storeId]
    );

    // average rating
    const avgRating = await con.query(
      "SELECT COALESCE(AVG(rating),0) as avg FROM ratings WHERE store_id = $1",
      [storeId]
    );

    // 5 star count
    const fiveStar = await con.query(
      "SELECT COUNT(*) FROM ratings WHERE store_id = $1 AND rating = 5",
      [storeId]
    );

    // 1 star count
    const lowStar = await con.query(
      "SELECT COUNT(*) FROM ratings WHERE store_id = $1 AND rating <= 2",
      [storeId]
    );

    res.json({
      success: true,
      data: {
        totalUsers: Number(totalUsers.rows[0].count),
        avgRating: Number(avgRating.rows[0].avg),
        fiveStar: Number(fiveStar.rows[0].count),
        lowStar: Number(lowStar.rows[0].count),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};