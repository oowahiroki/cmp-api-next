/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import * as jwt from 'jsonwebtoken'
const secretKey = process.env.MYSECRETKEY || 'mySecretKey'

/**
 * To generate JWT from user credential
 * @param {*} user
 * @returns JWT string
 */
export function GenerateToken(user: { userName: string; password: string }) {
    const payload = {
        userName: user.userName,
        password: user.password
    }
    const options: Object = {
        algorithm: 'HS384',
        expiresIn: 3600 // expires in 1 hours
    }
    const token: string = jwt.sign(payload, secretKey, options)
    return token
}
/**
 * To verify JWT string from requests
 * @param {*} token
 * @returns user credential
 */
// verify Token
export function VerifyToken(token: string): any {
    return jwt.verify(token, secretKey)
}
