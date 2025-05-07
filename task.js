const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/auth'); // ✅ Import added

// ✅ Create task (protected)
router.post('/create', async (req, res) => {
  const { title, description, due_date, priority, status, assigned_to, created_by } = req.body;

  if (!title || !description || !due_date || !priority || !status || !assigned_to || !created_by) {
    return res.status(400).json({ error: 'All fields must be provided' });
}

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, due_date, priority, status, assigned_to, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, due_date, priority, status, assigned_to, created_by]
    );

    res.status(201).json({ message: 'Task created successfully', task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get tasks (protected)
router.get('/user/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT * FROM tasks
       WHERE created_by = $1 OR assigned_to = $1
       ORDER BY due_date ASC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update task (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const taskId = req.params.id;
  const { title, description, due_date, priority, status, assigned_to } = req.body;

  try {
    await pool.query(
      `UPDATE tasks SET title=$1, description=$2, due_date=$3, priority=$4, status=$5, assigned_to=$6
       WHERE id=$7`,
      [title, description, due_date, priority, status, assigned_to, taskId]
    );

    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete task (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
