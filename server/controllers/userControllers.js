import con from "../config/db.js";


// GET all stores
// GET /api/user/stores
export const getStores = async (req, res) => {
  try {
    const result = await con.query(`
      SELECT 
        s.*,
        COALESCE(AVG(r.rating), 0) AS rating,

        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', u.id,
              'name', u.name,
              'email', u.email,
              'rating', r.rating
            )
          ) FILTER (WHERE u.id IS NOT NULL),
          '[]'
        ) AS rated_users

      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      LEFT JOIN users u ON u.id = r.user_id

      GROUP BY s.id
      ORDER BY s.id;
    `);

    return res.status(200).json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// GET one stores
// GET /api/user/stores/:id
export const getStoreById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await col.query(
            `SELECT s.*, COALESCE(AVG(r.rating),0) as rating
            FROM stores s
            LEFT JOIN ratings r ON s.id=r.store_id
            WHERE s.id=$1
            GROUP BY s.id`,
            [id]
        );

        return res.status(200).json({
            success: true,
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// POST add ratings
// POST /api/user/ratings
export const addRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const user_id = req.user.id;

    const result = await con.query(`
      INSERT INTO ratings (user_id, store_id, rating)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, store_id)
      DO UPDATE SET rating = EXCLUDED.rating
      RETURNING *
    `, [user_id, store_id, rating]);

    return res.status(200).json({
      success: true,
      message: "Rating saved successfully",
      data: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// GET all stores
// GET /api/user/rating/:id
export const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        const result = await con.query(
            "UPDATE ratings SET rating=$1 WHERE id=$2 RETURNING *",
            [rating, id]
        );

        return res.status(200).json({
            success: true,
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}