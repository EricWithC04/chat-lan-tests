import Express, { Application } from "express"
import { connectDB } from "./config/connectDB"
import { profileRouter } from "./routes/profile.routes"

const app: Application = Express()

app.use(Express.json())

app.use("/profile", profileRouter)

connectDB()
    .then(() => {
        app.listen(3500, () => console.log("Server is running on port 3500"))
    })
    .catch((err) => {
        console.error(err)
    })
