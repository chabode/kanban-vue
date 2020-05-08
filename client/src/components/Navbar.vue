<template>
    <div class="navbar">
        <div class="nama">KANBAN</div>
        <div class="nav" v-if="isLogin">
            <h5 style="margin-right: 2rem;">Hi, {{ email || emailNav }}</h5>
            <a href="/" @click.prevent="logout">Logout</a>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Navbar',
    props: ['isLogin','email'],
    data(){
        return {
            emailNav : ''
        }
    },
    methods: {
        logout(){
            this.$emit('logout')
        }
    },
    created(){
        if(localStorage.getItem('email')){
            this.emailNav = localStorage.getItem('email')
        } else {
            this.emailNav = ''
        }
    }
}
</script>

<style scoped>
.navbar{
    background-color: #040faf;
    color: white;
}
.navbar .nama{
    font-size: 30px;
}
.navbar .nav{
    max-width: 35%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.navbar .nav a{
    border-radius: 0rem;
    text-decoration: none;
    padding: 8px 15px;
    background-color: #f50a0a;
}
.navbar .nav a:hover{
    background-color: #f5680a;
}
</style>