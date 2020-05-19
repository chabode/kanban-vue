<template>
    <div class="board">
        <div class="title">
            <p style="text-align: center;">{{ category }}</p>
        </div>
        <div class="wrapper">
            <KanbanCard v-for="(card,index) in cards" :key="index" :card="card"
            @moveKiri="moveKiri" @hapus="hapus" @moveKanan="moveKanan"> </KanbanCard>
        </div>
        <AddTask v-if="condition" @addTask='addTask'> </AddTask>

        <button type="button"
        class="btn btn-info"
        v-on:click="newTask"
        v-if="!condition"
        @click="passData(category)">Add Task...</button>
    </div>
</template>

<script>

import axios from 'axios'
import AddTask from './AddTask'
import KanbanCard from './KanbanCard'

export default {
    name: 'KanbanBoard',
    props: ['category', 'url', 'cards'],
    components: {
        AddTask,
        KanbanCard
    },
    data(){
        return {
            userEmail: localStorage.email,
            condition: false,
            newCategory: ''
        }
    },
    created(){
        
    },
    methods: {
        newTask(){
            this.condition = true
        },
        passData(value){
            this.newCategory = value
        },
        addTask(value){
            const token = localStorage.getItem('access_token')
            axios({
                url: `${this.url}/task`,
                method: 'POST',
                data: {
                    title: value,
                    category: this.newCategory
                },
                headers: {
                    access_token : token
                }
            })
            .then(response => {
                this.$emit('callGetContent')
                this.condition = false
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No empty task inserted'
                })
                console.log(err.response)
            })
        },
        hapus(value){
            const token = localStorage.getItem('access_token')
            axios({
                url: `${this.url}/task/${value}`,
                method: 'DELETE',
                headers: {
                    access_token: token
                }
            })
            .then(response => {
                this.$emit('callGetContent')
            })
            .catch(err => {
                console.log(err)
            })
        },
        moveKanan(card){
            const token = localStorage.getItem('access_token')
            let newCat = ''
            switch(card.category){
                case 'Backlog':
                    newCat = 'Todo'
                    break;
                case 'Todo':
                    newCat = 'Completed'
                    break;
                case 'Completed':
                    newCat = 'Done'
                    break
            }
            axios({
                url: `${this.url}/task/${card.id}`,
                method: 'PATCH',
                data :{
                    category : newCat
                },
                headers: {
                    access_token : token
                }
            })
            .then(response => {
                 this.$emit('callGetContent')
            })
            .catch(err => {
                console.log(err)
            })
        },
        moveKiri(card){
            const token = localStorage.getItem('access_token')
            let newCat = ''
            switch(card.category){
                case 'Done':
                    newCat = 'Completed'
                    break;
                case 'Completed':
                    newCat = 'Todo'
                    break;
                case 'Todo':
                    newCat = 'Backlog'
                    break
            }
            axios({
                url: `${this.url}/task/${card.id}`,
                method: 'PATCH',
                data :{
                    category : newCat
                },
                headers: {
                    access_token : token
                }
            })
            .then(response => {
                 this.$emit('callGetContent')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.board{
    border: solid red .1em;
    margin: 5px;
    padding: 5px;
    height: 100%;
    width: 24%;
}
.wrapper{
    /* border: solid brown .1em; */
    background-color: green;
    height: 100%;
    overflow: scroll;
}
.card{
    text-align: left;
    margin: 10px;
    margin-left: 10px;
    display: flex;
    padding: 10px;
}
</style>