<template>
    <div class="AddTask" style="width: 300px">
        <form @submit.prevent="addTask">
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="title">
            </div>
            <button class="btn btn-info">Submit</button>
        </form>
    </div>    
</template>

<script>
export default {
    name: 'AddTask',
    data(){
        return {
            title : ''
        }
    },
    methods: {
        addTask(){
            this.$emit('addTask', this.title)
            this.title = ''
        }
    }

}
</script>

<style scoped>
.AddTask{
    height: 200px;
    width: 100px;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-bottom: 1px grey solid;
    
    /* background-color: black;
    color: white; */
}
</style>