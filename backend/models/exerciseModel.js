import db from "../config/database.js";

class ExerciseModel {
  // Get all exercises
  static async getAllExercises() {
    const sql = `SELECT * FROM exercises ORDER BY name`;
    const [rows] = await db.getConnection().promise().execute(sql);
    return rows;
  }

  // Search exercises by name or muscle group
  static async searchExercises(query) {
    const sql = `
      SELECT * FROM exercises 
      WHERE name LIKE ? OR muscle_group LIKE ? OR equipment LIKE ?
      ORDER BY name
      LIMIT 20
    `;
    const searchTerm = `%${query}%`;
    const [rows] = await db.getConnection().promise().execute(sql, [searchTerm, searchTerm, searchTerm]);
    return rows;
  }

  // Get exercises by muscle group
  static async getByMuscleGroup(muscleGroup) {
    const sql = `SELECT * FROM exercises WHERE muscle_group = ? ORDER BY name`;
    const [rows] = await db.getConnection().promise().execute(sql, [muscleGroup]);
    return rows;
  }

  // Get exercise by ID
  static async getById(id) {
    const sql = `SELECT * FROM exercises WHERE id = ?`;
    const [rows] = await db.getConnection().promise().execute(sql, [id]);
    return rows[0] || null;
  }

  // Get exercises by equipment list
  static async getByEquipment(equipmentList) {
    if (!equipmentList || equipmentList.length === 0) {
      return this.getAllExercises();
    }
    
    const placeholders = equipmentList.map(() => '?').join(', ');
    const sql = `SELECT * FROM exercises WHERE equipment IN (${placeholders}) ORDER BY name`;
    const [rows] = await db.getConnection().promise().execute(sql, equipmentList);
    return rows;
  }
}

export default ExerciseModel;
