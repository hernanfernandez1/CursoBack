export const dbOptions = {
    mysql: {
        client: "mysql",
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'coderhouse'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: './DB/message.sqlite'
        },
        useNullAsDefault: true
    }
}