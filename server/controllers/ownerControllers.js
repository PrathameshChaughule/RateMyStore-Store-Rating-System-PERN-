import con from "../config/db.js";

export const ownerDashboard = async (req, res) => {
  const owner_id = req.user.id;

  const store = await con.query(
    "SELECT * FROM stores WHERE owner_id=$1",
    [owner_id]
  );

  const storeId = store.rows[0].id;

  const ratings = await con.query(
    `SELECT u.name, r.rating
     FROM ratings r
     JOIN users u ON r.user_id = u.id
     WHERE r.store_id=$1`,
    [storeId]
  );

  const avg = await con.query(
    "SELECT AVG(rating) FROM ratings WHERE store_id=$1",
    [storeId]
  );

  res.json({
    storeName: store.rows[0].name,
    averageRating: avg.rows[0].avg,
    usersWhoRated: ratings.rows
  });
};