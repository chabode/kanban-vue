<template>
    <div id="app">
        <Navbar :isLogin="isLogin" :email="email" @logout="logout" > </Navbar>
        <UserPage v-if="!isLogin" :url="url" @isLogin="changeLogin"> </UserPage>
        <KanbanPage v-if="isLogin" :url='url'> </KanbanPage>
    </div>
</template>

<script>
import UserPage from './views/UserPage'
import Navbar from './components/Navbar'
import KanbanPage from './views/KanbanPage'

export default {
    name: 'App',
    data() {
        return {
            url : 'http://localhost:3000',
            isLogin: false,
            email: ''
        }
    },
    components: {
        UserPage,
        Navbar,
        KanbanPage
    },
    created(){
        if (localStorage.getItem('access_token')){
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    },
    methods: {
        logout(){
            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut()
            localStorage.clear()
            this.email = ''
            this.isLogin = false
        },
        changeLogin(email){
            this.email = email
            this.isLogin = true
        }
    }

}
</script>
