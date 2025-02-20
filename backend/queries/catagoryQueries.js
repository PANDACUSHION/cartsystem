module.exports = {
    catagoryQueries: {
        insertCategory: `
      INSERT INTO category (name) VALUES ($1) RETURNING *;
    `,
        removeCategory: `
      DELETE FROM category WHERE id = $1 RETURNING *;
    `
    }
}