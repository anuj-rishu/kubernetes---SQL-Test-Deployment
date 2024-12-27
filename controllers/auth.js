const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/user");
require("dotenv").config();

const authcontroller = {
  register: async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(email, hashedPassword);
      
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      if (!user)
        return res.status(404).json({
          error: "user not found",
        });

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch) return res.status(401).json({
            success:false,
            error: 'Invailed credentails'
        })

        const token =  jwt.sign({id : user.id} , process.env.JWT_SECRET ,{ expiresIn: '2hr'})
        res.status(200).json({
            token : token
        })

    } catch (error) {
      res.status(500).json({
        success: false,
        message: " an error occured while login",
        error: error,
      });
    }
  },
};

module.exports = authcontroller