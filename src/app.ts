import express from 'express'
import * as dotnevn from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import 'reflect-metadata'


dotnevn.config()

if(!process.env.PORT){
    console.log('Port not specified')
}

const port = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())
app.use(helmet())

app.listen(port, () => {
    console.log(`You are listening to port ${port}`)
})
