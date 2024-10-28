// dbConfig.ts
import { Sequelize } from 'sequelize';
import { NodeSSH } from 'node-ssh';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

const dbServer: DatabaseConfig = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string
};

const sshConfig = {
  host: process.env.SSH_HOST as string,
  port: parseInt(process.env.SSH_PORT as string, 10),
  username: process.env.SSH_USER as string,
  password: process.env.SSH_PASSWORD as string
};

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: dbServer.host,
  port: dbServer.port,
  username: dbServer.user,
  password: dbServer.password,
  database: dbServer.database,
});

// Function to create an SSH tunnel and connect to MySQL
export async function connectToDatabase(): Promise<Sequelize> {
  const ssh = new NodeSSH();

  try {
    await ssh.connect(sshConfig);
    console.log('SSH Connection established');

    return sequelize; // Return the Sequelize instance
  } catch (error) {
    throw new Error(`SSH Connection failed: ${error}`);
  }
}

// Export the sequelize instance for use in models
export default sequelize;