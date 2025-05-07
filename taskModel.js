  const pool = require('../db');

  const getAllTasks = async () => {
    const res = await pool.query('SELECT * FROM tasks ORDER BY due_date');
    return res.rows;
  };

  const getTaskById = async (id) => {
    const res = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return res.rows[0];
  };

  const createTask = async (task) => {
    const {
      title, description, due_date, priority, status, created_by, assigned_to,
    } = task;
    const res = await pool.query(
      `INSERT INTO tasks (title, description, due_date, priority, status, created_by, assigned_to)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, due_date, priority, status, created_by, assigned_to]
    );
    return res.rows[0];
  };

  module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
  };
