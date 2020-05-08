<template>
    <div class="UserPage">
        <p v-if="register">Register Here</p>
        <p v-if="login">Login Here</p>
        <form class="userForm">
            <label class="label">Email</label>
            <input type="text" class="form-control" v-model="email" placeholder="e.g: xxx@mail.id">
            <label class="label">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="******">
            <button v-if="register" class="btn btn-primary" @click.prevent="registerUser">Register</button>
            <button v-if="login" class="btn btn-primary" @click.prevent="loginUser">Login</button>
        </form>
        <p  v-if="register">Already have an account? <a class="btn" @click.prevent="showLogin">Login</a></p>
        <p v-if="login">Do you have an account ? <a class="btn"  @click.prevent="showRegister">Register</a></p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'UserPage',
    props: ['url'],
    components : {
        // Header
    },
    data() {
        return {
            email: '',
            password: '',
            login: false,
            register : true
        }
    },
    methods : {
        showLogin(){
            this.login = true
            this.register = false
        },
        showRegister(){
            this.login = false
            this.register = true
        },
        loginUser(){
            // const email = this.email
            // const password = this.password
            // console.log('ini login >>> ' + email + ' ' + password)
            axios({
                url : this.url + '/login',
                method: 'POST',
                data: {
                    email : this.email, 
                    password : this.password
                }
            })
            .then(response => {
                const data = response.data
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.email)
                this.$emit('isLogin',data.email)
                this.email = ''
                this.password = ''
            })
            .catch(err => {
                console.log(err.data)
                this.email = ''
                this.password = ''
            })
        },
        registerUser(){
            // const email = this.email
            // const password = this.password
            // console.log('ini register >>> ' + email + ' ' + password)
            axios({
                url: this.url + '/register',
                method: 'POST',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(data => {
                this.email = ''
                this.password = ''
                console.log(data)
            })
            .catch(err => {
                this.email = ''
                this.password = ''
                console.log(err.response)
            })
        }
    }
}
</script>

<style scoped>
.UserPage{
    padding: 5px;
    text-align: center;
    width: 100%;
    max-width: 300px;
    position: absolute;
    top: 15%;
    left: 40%;
    border: .1em black solid;
    box-shadow: 5px 5px;
}
.UserPage .enterBtn{
    margin: 10px;
    padding: 5px;
    width: 70px;
}
.UserPage .userForm{
    width: 100%;
    padding: 10px;
}
.UserPage .userForm .label{
    text-align: left;
}
</style>