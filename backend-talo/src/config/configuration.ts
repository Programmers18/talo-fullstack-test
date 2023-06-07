export default () => ({
	mysqlConn: {
		type: process.env.ORM_TYPE,
	    host: process.env.ORM_HOST,
	    port: process.env.ORM_PORT,
	    username: process.env.ORM_USER,
	    password: process.env.ORM_PASS,
	    database: process.env.ORM_DB,
	    autoLoadEntities: true,
	    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	    synchronize: true,
	}
});