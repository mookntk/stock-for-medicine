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
import mysql from 'mysql'
import net from 'net'
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "test"
// });
// console.log(con)
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     let sql = `SELECT * FROM user;`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       console.log("The Database is created!!");
//     });
// });
  export default {
  data(){
      return{
          username:"admin",
          password:"admin",
          type:""
      }
    },
    mounted(){
        
        // ConnectDatabase(con);
        
    },
    methods:{
        login:function(){
           axios.get("http://localhost:3306/login/"+this.username)
        .then(response=>{
            console.log(response)
        }) 
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