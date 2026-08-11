
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

import("./db/index.js").then(({ default: connectDB }) => {
    import("./app.js").then(({ app }) => {
        connectDB().then(() => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
            })
        })
    })
})
