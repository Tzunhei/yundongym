module.exports = (sequelize, DataTypes) => {
  const Performance = sequelize.define(
    'Performance',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      repetitions: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {},
  );
  Performance.associate = function ({ Performance, User, Set }) {
    Performance.belongsTo(User, { foreignKey: 'UserId' });
    Performance.belongsTo(Set, { foreignKey: 'SetId' });
  };

  return Performance;
};
