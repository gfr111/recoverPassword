<template>
  <div class="wrapper">
      <div class="loginBox" :style="{height:height}">
          <div class="header">
              <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/backLeft.png' class="returnBack" @click="returnBackEvent"/>
          </div>
         <div v-if="!isChangePass">
             <text class="centerTxt">忘记密码</text>
            <div class="inputBox">
            <div class="phoneBox">          
                <input placeholder="请输入手机号" placeholder-color="#ABABAB" class="contentInput" v-model="phone" ref="phoneTxt" type="number"/>
            </div>
            <div class="phoneBox" style="padding-right:10px;">
                <input placeholder="请输入验证码" placeholder-color="#ABABAB" class="contentInput" v-model="code" ref="codeTxt" type="number"/>
                <text class="sendCode" @click="sendCodeEvent" v-if="!isSendCode">发送验证码</text>
                <text class="sendCode" v-if="isSendCode&&!reSend" >重新发送{{reduceTime}}s</text>
                <text class="sendCode" v-if="isSendCode&&reSend" @click="sendCodeEvent">重新发送</text>
            </div>
            </div>
            <text class="login" @click="nextStep" >下一步</text>
         </div>
         <div v-else>
             <text class="centerTxt">修改密码</text>
            <div class="inputBox">
            <div class="phoneBox">          
                <input placeholder="请输入新密码" placeholder-color="#ABABAB" class="contentInput" v-model="password" ref="passwordTxt" type="password"/>
            </div>
            <div class="phoneBox">
                <input placeholder="请确认新密码" placeholder-color="#ABABAB" class="contentInput" v-model="rePassword" ref="rePasswordTxt" type="password"/>
            </div>
            </div>
            <text class="login" @click="submitChange">确认</text>
         </div>
      </div>
  </div>
</template>
<script>
const storage = weex.requireModule("storage");  
var stream = weex.requireModule('stream');
var nativeMoudle= weex.requireModule('nativeModule');
export default {
  name: 'App',
  data () {
    return {
        height:'',
        isChangePass:false,
        reduceTime:60,
        isSendCode:false,
        token:'eyJuYW1lIjoi5qKB5pWZ57uDIiwicGhvbmUiOiIxNTg4ODgzMDg0OCIsImFjY291bnRJZCI6NTMxNDM0LCJpbXBlcnNvbmF0ZWQiOmZhbHNlfQ==',
        webHost:'https://www.forzadata.cn',
        phone:'',
        reSend:false,
        code:'',
        password:'',
        rePassword:''
    }
  },
  created(){
     var that=this;
     that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50;
  },
  methods:{
      nextStep(){
          if(this.code==''){
              return nativeMoudle.toast('请先获取验证码！');
          };
            this.$refs.phoneTxt.blur();
            this.$refs.codeTxt.blur();
            this.isChangePass=true;
      },
      returnBackEvent(){
          var that=this; 
          if(that.isChangePass){
             that.isChangePass=false; 
             that.reSend=false;
             that.isSendCode=false;
             that.code='';
             that.password='';
             that.rePassword='';
             this.$refs.passwordTxt.blur();
             this.$refs.rePasswordTxt.blur();
          }else{
            that.$refs.phoneTxt.blur();
            that.$refs.codeTxt.blur();
            nativeMoudle.close();
          }
      },
      //倒计时
        countdown() {
            var that = this;
            if (that.reduceTime == 0) {
                that.reduceTime=60;
                that.reSend=true;
            }else{
                setTimeout(function () {
                    that.reduceTime--;    
                    that.reSend=false;
                    that.countdown();
                } , 1000)
            }       
        },
      sendCodeEvent(){
          var me=this;
          me.countdown();
          if(me.phone==''){
              return nativeMoudle.toast('请输入手机号！');
          }
          me.$refs.phoneTxt.blur();
          me.$refs.codeTxt.blur();
          me.isSendCode=true;       
          var data=JSON.stringify({
            'phone':me.phone
         }) 
          stream.fetch({
          method: 'POST',
          url: me.webHost+'/api/auth/admin/requestSmsCode',
          type:'json',
          headers:{
                    "Content-Type": 'application/json'
          },
          body:data
          }, function(ret) {             
          if(ret.ok){
              if(ret.data.status==0){
                  nativeMoudle.toast(ret.data.data);
              }else{
                  nativeMoudle.toast(ret.data.message);
              }      
          }else{
              nativeMoudle.toast('网络错误！');
          }
          },function(response){
                
          });
      },
      submitChange(){
          var me=this;
           me.$refs.passwordTxt.blur();
           me.$refs.rePasswordTxt.blur();
          if(me.password==''||me.rePassword==''){
            return  nativeMoudle.toast('请填写内容！'); 
          }
          if(me.password===me.rePassword){
                var data=JSON.stringify({
                    'phone':me.phone,
                    'password':me.password,
                    'code':me.code
                }) 
                  stream.fetch({
                  method: 'POST',
                  url: me.webHost+'/api/auth/admin/resetPassword',
                  type:'json',
                  headers:{
                            "Content-Type": 'application/json'
                  },
                  body:data
                  }, function(ret) {             
                  if(ret.ok){
                      if(ret.data.status==0){
                          //跳转到原生环境
                           nativeMoudle.toast('修改成功！')
                          setTimeout(() => {
                              nativeMoudle.close();
                          }, 1000);
                      }else{
                          nativeMoudle.toast(ret.data.message);
                      }      
                  }else{
                      nativeMoudle.toast('网络错误！');
                  }
                  },function(response){
                        
                  });
            }else{
                nativeMoudle.toast('两次密码输入不一致！');
            }
          
         
      }
  }
}
</script>

<style scoped>
    .loginBox{
    background-color: #ffffff;
    align-items: center;
    }
.header{
  height: 90px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 36px;
  width: 750px;
}
.returnBack{
    width: 48px;
    height: 48px;
    margin-left: 26px;
}
.centerTxt{
  color: #2B2B38;
  font-size: 40px;
  margin-left: 180px;
}
.inputBox{
  width: 530px;
  margin-top:42px;
}
.phoneBox{
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color:#E6E6E6;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 28px; 
  margin-top: 66px;
  width: 530px;
}
.phoneIcon{
  width: 44px;
  height: 44px;
  margin-left: 14px;
  margin-right: 6px;
}
.contentInput{
  font-size: 28px;
  border-width: 0;
  width: 300px;
  padding-left: 10px;
  height: 60px;
}
.forgivePass{
  width: 530px;
  flex-direction: row;
  text-align: right;
  margin-top:20px;
  margin-bottom: 80px;
  color: #7A7A7A;
  font-size: 28px;
}
.login{
  width: 530px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border-radius:100px;
  color: #ffffff;
  background-color:#F2736A;  
  font-size: 34px;
  margin-top: 140px;
}   
.sendCode{
    color: #F2736A;
    font-size: 26px;
    margin-right: 20px;
}
 </style>
