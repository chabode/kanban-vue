<template>
    <div>
        <div class="card">
            <p>{{ card.title }}</p>
            <p>By : {{ card.User.email}}</p>
            <p style="font-size: .7em">Created At: {{ card.createdAt.toLocaleString() }} </p>
            <div class="btn-group" role="group">
                <button class="btn btn-info" @click.prevent="moveKiri">Left</button>
                <!-- <button class="btn btn-primary" @click="edit">Edit</button> -->
                <button class="btn btn-danger" @click.prevent="hapus">Delete</button>
                <button class="btn btn-info" @click.prevent="moveKanan">Right</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['card'],
    data() {
        return {

        }
    },
    methods: {
        moveKiri() {
            if (localStorage.getItem('email') === this.card.User.email) {
                this.$emit('moveKiri', this.card)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sorry, you cant do this action!',
                })
            }
        },
        hapus() {
            if (localStorage.getItem('email') === this.card.User.email) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.value) {
                        this.$emit('hapus', this.card.id)
                    }
                }) 
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sorry, you cant do this action!',
                })
            }
        },
        moveKanan() {
            if (localStorage.getItem('email') === this.card.User.email) {
                this.$emit('moveKanan', this.card)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sorry, you cant do this action!',
                })
            }
        }
    }
}
</script>

<style>

</style>