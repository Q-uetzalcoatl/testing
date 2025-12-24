const DB_KEY = 'dcit26_proctor_db_v1';

// Initialize DB structure if missing
const initDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    const initialData = {
      config: {
        areScoresReleased: false, // Instructor controls this
        examPassword: 'admin',    // Instructor password
      },
      students: [] 
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
  }
};

export const mockDb = {
  getRaw: () => {
    initDB();
    return JSON.parse(localStorage.getItem(DB_KEY));
  },

  saveRaw: (data) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  // Student Actions
  loginStudent: (studentId, name) => {
    const db = mockDb.getRaw();
    let student = db.students.find(s => s.id === studentId);
    
    if (!student) {
      student = {
        id: studentId,
        name: name,
        score: 0,
        violations: 0,
        status: 'pending', // pending | completed
        answers: [],
        timestamp: null
      };
      db.students.push(student);
      mockDb.saveRaw(db);
    }
    return student;
  },

  submitExam: (studentId, score, answers) => {
    const db = mockDb.getRaw();
    const index = db.students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      db.students[index].score = score;
      db.students[index].answers = answers;
      db.students[index].status = 'completed';
      db.students[index].timestamp = new Date().toLocaleString();
      mockDb.saveRaw(db);
    }
  },

  logViolation: (studentId) => {
    const db = mockDb.getRaw();
    const index = db.students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      db.students[index].violations += 1;
      mockDb.saveRaw(db);
      return db.students[index].violations;
    }
    return 0;
  },

  // Admin Actions
  toggleRelease: () => {
    const db = mockDb.getRaw();
    db.config.areScoresReleased = !db.config.areScoresReleased;
    mockDb.saveRaw(db);
    return db.config.areScoresReleased;
  },

  resetSystem: () => {
    localStorage.removeItem(DB_KEY);
    window.location.reload();
  }
};
