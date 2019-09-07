<template>

<!------ Include the above in your HEAD tag ---------->

    <div class="container login-container">
        <div class="row">
            <div class="col-md-6 login-form-1">
                <h3>Login for Form 1</h3>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Email *" value="" v-model = "username" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Your Password *" value="" v-model = "password"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btnSubmit" value="Login" @click="login"/>
                    </div>
                    <div class="form-group">
                        <a href="#" class="ForgetPwd">Forget Password?</a>
                    </div>
                    <p>{{username}}</p>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
// import ConnectDatabase from '../server/server'
import axios from 'axios'
  export default {
  data(){
      return{
          username:"hos_staff",
          password:"1234",
          type:"",
          data:""
      }
    },
    mounted(){
        axios.get("http://localhost:3000/user")
        .then(res => {
            this.data=res.data
            console.log(this.data)}
        
        )
        // this.allRecords();
        // ConnectDatabase(con);
        
    },
    methods: {
        login:function(){
            console.log("login")
            var size = 0;
        for (var key in this.data) {
                if (this.data.hasOwnProperty(key)) size++;
            }
            for(var i=0;i<size;i++){
                if(this.data[i].username==this.username&&this.data[i].password==this.password){
                    this.$router.push('/about')
                }
            }
        }
   }
}

</script>

<style scope>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
}
.login-form-1{
    padding: 5%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3{
    text-align: center;
    color: #333;
}
.login-form-2{
    padding: 5%;
    background: #0062cc;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
    text-align: center;
    color: #fff;
}
.login-container form{
    padding: 10%;
}
.btnSubmit
{
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    border: none;
    cursor: pointer;
}
.login-form-1 .btnSubmit{
    font-weight: 600;
    color: #fff;
    background-color: #0062cc;
}
.login-form-2 .btnSubmit{
    font-weight: 600;
    color: #0062cc;
    background-color: #fff;
}
.login-form-2 .ForgetPwd{
    color: #fff;
    font-weight: 600;
    text-decoration: none;
}
.login-form-1 .ForgetPwd{
    color: #0062cc;
    font-weight: 600;
    text-decoration: none;
}

</style>