export default function modelFactory(sequelize, DataTypes) {
  return sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    description: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    creator_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    createdAt: true,
    updatedAt: true
  });
}
