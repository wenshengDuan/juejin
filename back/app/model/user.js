// 用户字段设计
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  // 定义一个用户模型
  const UserSchema = new Schema({
    __v: {type: Number, select: false},
    email: {type: String, required: true},
    nickname: {type: String, required: true},
    password: {type: String, required: true, select: false},
    avatar: {type: String, required: false, default: '/user.png'}
  }, {timestamps: true})

  return mongoose.model('User', UserSchema)
}