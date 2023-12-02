import jwt from 'jsonwebtoken'


export const dynamic = "force-dynamic"


const AuthUser = async (req) => {
 const token = req.headers.get('Authorization')?.split(" ")[1]

 if(!token) return false

 console.log(token)

 try {
  const extractAuthUserInfo = jwt.verify(token, "default_secret_key")
  // console.log(extractAuthUserInfo)
  if(extractAuthUserInfo) return extractAuthUserInfo
 } catch (err) {
  console.log(err)
  
  return false
 }
}

export default AuthUser