 
import mongoose from 'mongoose';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




export const signin = async (req, res) => { 
    
    const { email, password} = req.body;
   
    try {

        const exsistingUser = await User.findOne({ email });
        
        if(!exsistingUser) return res.status(404).json({message: 'User not found'});

        const ifPasswordCorrect = await bcrypt.compare(password, exsistingUser.password);

        if(!ifPasswordCorrect) return res.status(40).json({message: 'Invalid credentials'});

        const token = jwt.sign({email:exsistingUser.email, id:exsistingUser._id }, 'test', {expiresIn: "1h" });

        res.status(200).json({   result:exsistingUser, token});

    } 
    
    catch (error) {
        
        res.status(500).json({message:"something went wrong."});
    }
}


export const signup = async (req, res) => {

    const {email, password,firstName,lastName,confirmPassword } = req.body;

    
    try {
        const exsistingUser = await User.findOne({ email });

        if(exsistingUser) return res.status(400).json({message: 'User already exists'});  

        if(password !== confirmPassword) return res.status(400).json({message: 'Password dont match'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token =  jwt.sign({email:result.email, id:result._id},'test', {expiresIn: "1h" } );

        res.status(200).json({ result, token});
    }
    
    catch (error) {
        res.status(500).json({ message:"something went wrong."});
        console.log(error);
    }
}
