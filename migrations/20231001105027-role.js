module.exports = {
  async up(db, client) {
    /**
     * System roles
     */
    const roles = [
      {
        role: 'admin',
      
        __v: 0,
      },
      {
        role: "user",
       
        __v: 0,
      },
    ];
    await db.collection("roles").insertMany(roles);
  },

  async down(db, client) {
  
    /**
     * delete system role
     */
    await db.collection('roles').deleteMany({ role: { $in: ['admin', 'user'] } });
  }
};
