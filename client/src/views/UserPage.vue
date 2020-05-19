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
        <p v-if="register">Already have an account? <a class="btn" @click.prevent="showLogin">Login</a></p>
        <p v-if="login">Do you have an account ? <a class="btn"  @click.prevent="showRegister">Register</a></p>
        <p>OR</p>
        <g-signin-button class="btn btn-primary"
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Google
        </g-signin-button>
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
            register : true,
            googleSignInParams :{
                client_id: "814540410174-94lo0pjocfi3mdtar29dot2e5665jla1.apps.googleusercontent.com"
            }
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password'
                })
                console.log(err)
                this.email = ''
                this.password = ''
            })
        },
        registerUser(){
            
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: err.response.request.response
                })
                this.email = ''
                this.password = ''
                console.log(err.response)
            })
        },
        onSignInSuccess (googleUser) {
            const {id_token} = googleUser.getAuthResponse()
            axios({
                url: this.url + '/googlesign',
                method: 'POST',
                data :{
                    id_token
                }
            })
            .then(response => {
                const data = response.data
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.email)
                this.$emit('isLogin', data.email)
            })
            .catch(err => {
                console.log('Error Login >> ' + err)
            })
        },
        onSignInError (error) {
        
            console.log('Error >>> ', error)
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