
import bcrypt from "bcrypt"

export const verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}

export const hashPassword = async(password:string)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}