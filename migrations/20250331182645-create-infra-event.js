// filepath: migrations/20230331123456-create-infra-event.js
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable("equipment", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hostname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      os: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      os_version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable("infra_events", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      equipmentId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      acknowledged: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      severity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("infra_events");

    await queryInterface.dropTable("equipment");
  },
};