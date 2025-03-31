import { Sequelize, DataTypes, Model, Optional, Association } from "sequelize";
import { sequelize } from "../config/sequelize";

interface severity {
    id: number;
    name: string;
}

export const zabbixSeverities: severity[] = [
    { id: 0, name: 'Baja' },
    { id: 1, name: 'Baja' },
     { id: 2, name: 'Media' },
    { id: 3, name: 'Media' },
    { id: 4, name: 'Alta' },
    { id: 5, name: 'Crítica' },
  ]

export const wazuSeverities: severity[] = [
    { id: 0, name: 'Baja' },
    { id: 1, name: 'Baja' },
    { id: 2, name: 'Baja' },
    { id: 3, name: 'Baja' },
    { id: 4, name: 'Baja' },
    { id: 5, name: 'Baja' },
    { id: 6, name: 'Baja' },
    { id: 7, name: 'Media' },
    { id: 8, name: 'Media' },
    { id: 9, name: 'Media' },
    { id: 10, name: 'Media' },
    { id: 11, name: 'Media' },
    { id: 12, name: 'Alta' },
    { id: 13, name: 'Alta' },
    { id: 14, name: 'Alta' },
    { id: 15, name: 'Crítica' },
    { id: 16, name: 'Crítica' },
  ]

// Define the Equipment model
class Equipment extends Model {
  public id?: number;
  public name?: string;
  public type?: string;
  public ip?: string;
  public hostname?: string;
  public os?: string;
  public os_version?: string;
}

Equipment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    os_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "equipment",
  }
);

// Define the InfraEvent model
class InfraEvent extends Model {
  public id?: number;
  public origin?: string;
  public eventid?: string;
  public equipmentId?: number; // Foreign key
  public description?: string;
  public status?: string;
  public acknowledged?: boolean;
  public severity?: string;
  public timestamp?: Date;
  public detail?: string;

    // Add the Equipment association
    equipment?: Equipment;

    static associations: {
      equipment: Association<InfraEvent, Equipment>;
    };
}

InfraEvent.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    equipmentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: Equipment,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",    
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acknowledged: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    severity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "infra_events",
  }
);

// Define associations
InfraEvent.belongsTo(Equipment, { foreignKey: "equipmentId" });
Equipment.hasMany(InfraEvent, { foreignKey: "equipmentId" });

export { sequelize, InfraEvent, Equipment };