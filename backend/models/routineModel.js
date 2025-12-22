import db from "../config/database.js";

class RoutineModel {
  // Create a new routine
  static async createRoutine({ userId, name, description = null, folderId = null }) {
    const sql = `
      INSERT INTO routines (user_id, name, description, folder_id)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.getConnection().promise().execute(sql, [
      userId,
      name,
      description,
      folderId
    ]);
    return result.insertId;
  }

  // Add exercises to a routine
  static async addExercisesToRoutine(routineId, exercises) {
    const sql = `
      INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, reps)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i];
      await db.getConnection().promise().execute(sql, [
        routineId,
        ex.exerciseId,
        i,
        ex.sets || 3,
        ex.reps || 10
      ]);
    }
  }

  // Get all routines for a user
  static async getUserRoutines(userId) {
    const sql = `
      SELECT r.*, 
        (SELECT COUNT(*) FROM routine_exercises WHERE routine_id = r.id) as exercise_count
      FROM routines r 
      WHERE r.user_id = ? 
      ORDER BY r.created_at DESC
    `;
    const [rows] = await db.getConnection().promise().execute(sql, [userId]);
    return rows;
  }

  // Get a single routine with its exercises
  static async getRoutineById(routineId, userId) {
    const routineSql = `SELECT * FROM routines WHERE id = ? AND user_id = ?`;
    const [routines] = await db.getConnection().promise().execute(routineSql, [routineId, userId]);
    
    if (routines.length === 0) return null;

    const exercisesSql = `
      SELECT re.*, e.name, e.muscle_group, e.equipment, e.image_url
      FROM routine_exercises re
      JOIN exercises e ON re.exercise_id = e.id
      WHERE re.routine_id = ?
      ORDER BY re.exercise_order
    `;
    const [exercises] = await db.getConnection().promise().execute(exercisesSql, [routineId]);

    return { ...routines[0], exercises };
  }

  // Update a routine
  static async updateRoutine(routineId, userId, { name, description }) {
    const sql = `UPDATE routines SET name = ?, description = ? WHERE id = ? AND user_id = ?`;
    const [result] = await db.getConnection().promise().execute(sql, [
      name, 
      description || null, 
      routineId, 
      userId
    ]);
    return result.affectedRows > 0;
  }

  // Delete a routine
  static async deleteRoutine(routineId, userId) {
    const sql = `DELETE FROM routines WHERE id = ? AND user_id = ?`;
    const [result] = await db.getConnection().promise().execute(sql, [routineId, userId]);
    return result.affectedRows > 0;
  }

  // Update exercises in a routine (replace all)
  static async updateRoutineExercises(routineId, exercises) {
    // Delete existing exercises
    await db.getConnection().promise().execute(
      `DELETE FROM routine_exercises WHERE routine_id = ?`,
      [routineId]
    );
    // Add new exercises
    if (exercises && exercises.length > 0) {
      await this.addExercisesToRoutine(routineId, exercises);
    }
  }

  // Get user stats
  static async getUserStats(userId) {
    const sql = `
      SELECT 
        (SELECT COUNT(*) FROM routines WHERE user_id = ?) as plans_count,
        (SELECT COUNT(*) FROM routine_exercises re 
         JOIN routines r ON re.routine_id = r.id 
         WHERE r.user_id = ?) as exercises_count,
        (SELECT COALESCE(SUM(re.sets), 0) FROM routine_exercises re 
         JOIN routines r ON re.routine_id = r.id 
         WHERE r.user_id = ?) as total_sets
    `;
    const [rows] = await db.getConnection().promise().execute(sql, [userId, userId, userId]);
    return rows[0];
  }

  // Get routine creation dates for calendar
  static async getRoutineDates(userId) {
    const sql = `
      SELECT DATE(created_at) as date, COUNT(*) as count 
      FROM routines 
      WHERE user_id = ? 
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;
    const [rows] = await db.getConnection().promise().execute(sql, [userId]);
    return rows;
  }
}

export default RoutineModel;
