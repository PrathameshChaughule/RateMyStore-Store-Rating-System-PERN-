import bcrypt from "bcryptjs"
import con from "../config/db.js"


// count
// GET /api/admin/dashboard-stats
export const getDashboardStats = async (req, res) => {
  try {
    const users = await con.query("SELECT COUNT(*) FROM users");
    const stores = await con.query("SELECT COUNT(*) FROM stores");
    const ratings = await con.query("SELECT COUNT(*) FROM ratings");

    res.json({
      success: true,
      data: {
        totalUsers: users.rows[0].count,
        totalStores: stores.rows[0].count,
        totalRatings: ratings.rows[0].count,
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// add User
// POST /api/admin/user
export const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body

    const hashPassword = await bcrypt.hash(password, 10)
    const result = await con.query(`INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashPassword, address, role]
    )

    return res.status(201).json({
      success: true,
      message: `Successfully User(${role}) Added`,
      data: result.rows[0]
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// delete user
// DELETE /api/admin/user-delete/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await con.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// update user
// PUT /api/admin/user/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, role } = req.body;

    let query = `
        UPDATE users 
        SET name = $1,
            email = $2,
            address = $3,
            role = $4
        WHERE id = $5
        RETURNING *
      `;
    let values = [name, email, address, role, id];


    const result = await con.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// get count
// GET /api/admin/user-counts
export const getUserStats = async (req, res) => {
  try {
    const result = await con.query(`
      SELECT 
        COUNT(*) AS total_users,
        COUNT(*) FILTER (WHERE role = 'ADMIN') AS total_admins_role,
        COUNT(*) FILTER (WHERE role = 'USER') AS total_users_role,
        COUNT(*) FILTER (WHERE role = 'OWNER') AS total_owners_role
      FROM users
    `);

    return res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// add Store
// POST /api/admin/store
export const addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id, image, description } = req.body

    const result = await con.query(`INSERT INTO stores (name, email, address, owner_id, image, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, address, owner_id, image, description]
    )

    return res.status(201).json({
      success: true,
      message: "Successfully Store Added",
      data: result.rows[0]
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// get all users
// GET /api/admin/allUsers
export const getAllUsers = async (req, res) => {
  try {
    const result = await con.query(`SELECT 
        u.id,
        u.name,
        u.email,
        u.address,
        u.role,
        s.name AS storeName,
        COALESCE(AVG(r.rating), 0) AS rating
      FROM users u
      LEFT JOIN stores s ON u.id = s.owner_id
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY u.id, s.id
      ORDER BY u.id;
    `)

    return res.status(200).json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// GET /api/admin/users?page=1&limit=6&search=&role=
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 6, search = "", role = "ALL" } = req.query;

    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.address,
        u.role,
        s.name AS storeName,
        COALESCE(AVG(r.rating), 0) AS rating
      FROM users u
      LEFT JOIN stores s ON u.id = s.owner_id
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;

    let countQuery = `SELECT COUNT(*) FROM users u WHERE 1=1`;
    let values = [];
    let i = 1;

    // 🔍 SEARCH
    if (search) {
      query += ` AND (
    LOWER(u.name) LIKE $${i} 
    OR LOWER(u.email) LIKE $${i}
    OR LOWER(u.address) LIKE $${i}
  )`;

      countQuery += ` AND (
    LOWER(u.name) LIKE $${i} 
    OR LOWER(u.email) LIKE $${i}
    OR LOWER(u.address) LIKE $${i}
  )`;

      values.push(`%${search.toLowerCase()}%`);
      i++;
    }

    // 🎭 ROLE FILTER
    if (role !== "ALL") {
      query += ` AND u.role = $${i}`;
      countQuery += ` AND u.role = $${i}`;
      values.push(role);
      i++;
    }

    query += `
      GROUP BY u.id, s.id
      ORDER BY u.id
      LIMIT $${i} OFFSET $${i + 1}
    `;

    values.push(limit, offset);

    const result = await con.query(query, values);
    const countResult = await con.query(countQuery, values.slice(0, i - 1));

    const totalUsers = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: Number(page)
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// get one user
// GET /api/admin/user/:id
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const result = await con.query(`SELECT id, name, email, address, role FROM users WHERE id=$1`, [userId])

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


// get all stores
// GET /api/admin/stores
// export const getStores = async (req, res) => {
//     try {
//         const result = await con.query(`
//             SELECT s.*, COALESCE(AVG(r.rating),0) as rating
//             FROM stores s
//             LEFT JOIN ratings r ON s.id = r.store_id
//             GROUP BY s.id
//         `);

//         return res.status(200).json({
//             success: true,
//             data: result.rows
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// GET /api/admin/stores?page=1&limit=6
export const getStores = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    // 🔹 Stores with rating
    const result = await con.query(`
            SELECT 
                s.*, 
                COALESCE(AVG(r.rating), 0) AS rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            GROUP BY s.id
            ORDER BY s.id
            LIMIT $1 OFFSET $2
        `, [limit, offset]);

    // 🔹 Total stores count
    const countResult = await con.query(`SELECT COUNT(*) FROM stores`);
    const totalStores = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalStores / limit);

    return res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        totalStores,
        totalPages,
        currentPage: page,
        limit
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// delete store
// DELETE /api/admin/store-delete/:id
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await con.query(
      `DELETE FROM stores WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Store deleted successfully",
      data: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};