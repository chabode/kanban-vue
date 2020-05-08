<template>
    <div class="container">
        <KanbanBoard v-for="(category, index) in categories" 
        :key="index" :category="category" :url='url' 
        :cards='filter[category]' @callGetContent='callGetContent'> </KanbanBoard>
    </div>
</template>

<script>

import KanbanBoard from '../components/KanbanBoard'
import axios from 'axios'

export default {
    name: 'KanbanPage',
    props: ['url'],
    components: {
        KanbanBoard
    },
    data() {
        return {
            categories :['Backlog','Todo','Completed','Done'],
            cards : []
        }
    },
    created(){
        this.getContent();
    },
    computed: {
        filter(){
            return {
                Backlog: this.backlog,
                Todo: this.todo,
                Completed: this.completed,
                Done: this.done
            }
        },
        backlog(){
            return this.cards.filter(card => card.category == 'Backlog')
        },
        todo(){
            return this.cards.filter(card => card.category == 'Todo')
        },
        completed(){
            return this.cards.filter(card => card.category == 'Completed')
        },
        done(){
            return this.cards.filter(card => card.category == 'Done')
        }
    },
    methods: {
        getContent() {
            const token = localStorage.getItem('access_token')
            axios({
                url: `${this.url}/task`,
                method: 'GET',
                headers : {
                    access_token : token
                }
            })
            .then(response => {
                this.cards = response.data
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        callGetContent(){
            this.getContent()
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    border: .1em solid black;
    justify-content: space-evenly;
    /* width: 100%; */
    max-width: 100%;
    height: 100%;
}
</style>