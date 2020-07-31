<template>
  <div class="wrapper">
      <div class="loginBox" :style="{height:height}">
         <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/bocaiIcon.png' class="centerIcon"/>
         <text class="centerTxt">菠菜教练</text>
         <div class="inputBox">
           <div class="phoneBox">
             <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/phoneIcon.png' class="phoneIcon"/>
             <input placeholder="请输入手机号" placeholder-color="#ABABAB" class="contentInput"/>
           </div>
           <div class="phoneBox">
             <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/passwordIcon.png' class="phoneIcon"/>
             <input placeholder="请输入密码" placeholder-color="#ABABAB" class="contentInput"/>
           </div>
         </div>
         <text class="forgivePass" @click="forgivePassEvent">忘记密码？</text>
         <text class="login" @click="loginIn">登录</text>
      </div>
  </div>
</template>
<script>
const storage = weex.requireModule("storage");  
var stream = weex.requireModule('stream');
export default {
  name: 'App',
  data () {
    return {
        height:''
    }
  },
  created(){
    var that=this;
    that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50;
  },
  methods:{
    loginIn(){
          
    },
    forgivePassEvent(){
       this.$router.push('recoverPass');
    }
  }
}
</script>

<style scoped>
.loginBox{
  background-color: #ffffff;
  align-items: center;
}
.centerIcon{
  width: 144px;
  height: 144px;
  margin-top:120px;
  margin-bottom: 14px;
}
.centerTxt{
  color: #2B2B38;
  font-size: 40px;
}
.inputBox{
  width: 520px;
  margin-top:42px;
}
.phoneBox{
  flex-direction: row;
  align-items: center;
  border-bottom-color:#E6E6E6;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 28px; 
  margin-top: 66px;
}
.phoneIcon{
  width: 44px;
  height: 44px;
  margin-left: 14px;
  margin-right: 6px;
}
.contentInput{
  font-size: 28px;
  padding-left: 10px;
  border-width: 0;
  width: 350px;
}
.forgivePass{
  width: 520px;
  flex-direction: row;
  text-align: right;
  margin-top:20px;
  margin-bottom: 80px;
  color: #7A7A7A;
  font-size: 28px;
}
.login{
  width: 520px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border-radius:100px;
  color: #ffffff;
  background-color:#F2736A;  
  font-size: 34px;
}
 </style>
