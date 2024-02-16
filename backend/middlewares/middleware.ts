import jwt, {JwtPayload} from "jsonwebtoken"
import { JWT_SECRET } from "../routes/config";

export default function middleware(req: any, res: any, next: any){
    const { authorization: token } = req.headers;
    console.log("this is req headers ",req.headers);
    console.log("this is the token ",token);
    console.log(req.body);
    
    
    
    if (!token) {
        return res.status(401).json({ msg: "Authorization header is missing or empty updated bc" });
    }
    const myToken = token.split(" ")[1];
    try{
        const decode = jwt.verify(myToken, JWT_SECRET) as JwtPayload;
        req.body.userId = decode.userId;
        next();
    }catch(error){
        return res.status(403).json({msg: "Auth failed!"});
    }
}