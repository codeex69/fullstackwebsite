import {prisma } from "../config/db.js"

 const register = async (req,res)  => {

    const {name,email,password}=req.body
    const userexist=await prisma.user.findUnique({
        where: {email:email},
    })
    if (userexist) {
        return res.status(400).json({error:"user already exist"})
    }

const user =await prisma.user.create({
         data:{
        name,
        email,
        password,
    }

    })
     res.status(201).json({
        status:"success",
        data:{
        user:{
id: user.id,
name :name,
email : email,

        },
        
        }
    }) }
      const login = async (req,res)=> {
    const{email,password}=req.body
    const user = await prisma.user.findUnique({
        where :{email:email}
        
    })
    if (!user){
            return res.status(401).json({error:"invalid email or passsword"})
        }
     
        
        if(password != user.password){
            return res.status(401).json({error:"invalidemailorpasssword"})
        } 

    return res.status(201).json("good")
     
    }
        export   {register,login }