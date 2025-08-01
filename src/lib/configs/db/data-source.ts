import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService} from '@nestjs/config';
config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'admin'),
    database: configService.get<string>('DB_NAME', 'fun_task_db'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    logging: configService.get<boolean>('DB_LOGGING', false),
}
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
