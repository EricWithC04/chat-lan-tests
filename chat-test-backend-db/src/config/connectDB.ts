import { sequelize } from "./relations";

export const connectDB = async () => {
    try {

        return new Promise((resolve, reject) => {
            sequelize.sync({  })
                .then(() => {
                    console.log('Connection has been established successfully.');
                    resolve(true)
                })
                .catch(err => {
                    console.error('Unable to connect to the database:', err);
                    reject(false)
                })
        })

    } catch (err) {
        console.error(err)
    }
}