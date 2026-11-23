import {getAuth} from "firebase-admin/auth";
import crypto from "crypto";
import type{Request, Response} from "express";

import{app} from "../config/firebase.js";
import pool from "../config/db.js"
import redis from "../shared/redis/redis.js"

// login
export const GoogleAuth = async (req: Request, res: Response) =>{ //GoogleAuth is used to authenticate users through their Google accounts.
    try{
        const{token} = req.body;
        
        if(!token){
            return res
            .status(400)
            .json({success:false, error: 'Firebase ID token is required'});
        }
        //verify firebase id token
        const decoded = await getAuth(app).verifyIdToken(token);
        
        //2. find existing user or create a new user
        const result = await pool.query(
            `
            INSERT INTO users(firebase_uid, email, display_name)
            VALUES($1, $2, $3)
            ON CONFLICT (FIREBASE_UID)
            DO UPDATE SET
                email = COALESCE(EXCLUDED.display_name, users.display_name)
                RETURNING id, firbase_uid, email , display_name, create_at
            `,
            [decoded.uid, decoded.email ?? null, decoded.name ?? null]  //?? is called the Nullish Coalescing Operator in JavaScript.
        );
         const user = result.rows[0]; // Contains the rows returned by the SQL query.

         // 3.Generate unique session id
         const sessionId = crypto.randomUUID();

         //4. Store session in Redis for 7 days
         await redis.set(
            `session:$(sessionId)`,
            JSON.stringify({                   //JSON.stringify() converts a JavaScript value (object or array) into a JSON string.
                id:user.id,
                email: user.email,
                display_name: user.display_name,
                firebase_uid: user.firebase_uid,
                create_at: user.create_at,
            }),  
            "EX",
            7*24*60*60,   
         );

         // 5. Store session ID in HHTP-only cookie
        const isProduction = process.env.NODE_ENV === "production";

         res.cookie("session", sessionId,{
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge:  7*24*60*60, 
         });

         return res.status(200).json({
            success:true,
            user,
         });
    }
    catch(error){
        console.error("Google authentication error:", error);

        return res.status(500).json({
            success: false,
            message:"Authentication failed",
        });
    }
};
// logout
export const logOut = async(req:Request, res: Response) =>{
    try{
        const sessionId = req.cookies?.session;

        // 1. delete session from redis if it exit

        if(sessionId){
            await redis.del(`session:${sessionId}`);
        }

        // 2. clear session cookie
        const isProduction = process.env.NODE_ENV === "production";
        
        res.clearCookie("session",{
            httpOnly: true,
            secure: isProduction,
            sameSite:isProduction ? "none" : "lax",
        });
         return res.status(200).json({
            success: true,
            message:"Logout successfull",
         });
    }
    catch(error){
        console.error("Logout error:", error);

        return res.status(500).json({
            success:false,
            message: "Logout failed",
        });
    }
};


// get current user

export const getCurrentUser = async(req:Request, res:Response) =>{
    try{
        return res.status(200).json({success:true, user: req});
    }catch(error){
        console.log("get current user error:", error);
        return res
        .status(500)
        .json({success: false, message:"Internal Server Error"});
    }

};
