module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role: DataTypes.ENUM('ADMIN', 'USER'),
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isConfirmed: DataTypes.BOOLEAN,
    },
    {},
  );
  User.associate = function (models) {
    // associations can be defined here
  };

  return User;
};
