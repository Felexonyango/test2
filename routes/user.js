const User = require("../model/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("../confing");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");


router.post("/user",
[
      check("name", "Name is required")
        .not()
        .isEmpty(),
        
      check("email", "Please include a valid email").isEmail()
      .trim(),
      check(
        "password",
        "Please enter a password with 8 or more characters"
      ).isLength({ min: 8 })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password} = req.body;
     
  
      try {
        let user = await User.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }
  
  
        user = new User({
          name,
          email,
          password,
        
        });
  
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(payload,config.JWT_SECRETE,
          { expiresIn: "7d",},
          (error, token) => {
            if (error) throw error;
           res.json({token})
          }
        );
    
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
    }
  );


module.exports = router;

  