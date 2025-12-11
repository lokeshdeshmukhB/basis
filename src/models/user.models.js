import mongoose ,{mongo, Schema }from'mongoose'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UseSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,    
    unique:true,
    lowercase:true,
    trim:true
  },
  fullname:{
    type:String,
    required:true,
    trim:true,index:true
  },
  avatar:{
    type:String,
    require:true
  },
  coverImage:{
    type:String,
    require:true
  },
  watchHistory:[
    {
      type:Schema.Types.ObjectId,
      ref:'Video'
    }
  ],password:{
    type:String,
    required:[true,'password is required']
  },
  refreshTokens:
    {
     type:String
    }
  
},{
  timestamps:true
})
userSchema.pre('save',async function(next){
  if(!this.isModified("password")) return next();
  this.password=brcypt.hashSync(this.password,10)
  next()
})
userSchema.methods.isPasswordCorrect=async function (password){
  return await bcrypt.compare(password,this.password)  
}
userSchema.methods.generateAccessToken=function(){
  jwt.sign(

  {
    _id:this._id,
    email:this.username,
    fullname:this.fullname,
  },
  process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
  )

}
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
)
}

 export const User=mongoose.model('User',UseSchema)