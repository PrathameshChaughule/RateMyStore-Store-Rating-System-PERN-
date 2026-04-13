import con from "../config/db.js";

export const getTrendingStores = async (req, res) => {
  try {
    const result = await con.query(`
      SELECT 
        s.*,
        COALESCE(AVG(r.rating), 0) AS avg_rating,
        COUNT(r.id) AS total_ratings,

        -- trending score
        COALESCE(AVG(r.rating), 0) * LOG(COUNT(r.id) + 1) AS trending_score

      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY trending_score DESC
      LIMIT 10
    `); 

    return res.json({
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