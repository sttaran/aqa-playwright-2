import dotenv from 'dotenv'

dotenv.config({
    path: process.env.ENV ? `env/.env.${process.env.ENV}` : 'env/.env'
})

export const config = {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD,
    }
}