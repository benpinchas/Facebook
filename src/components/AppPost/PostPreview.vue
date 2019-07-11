<template>
    <div class="post-preview">
        
        <header>
            he           
        </header>

        <main>
            <span v-html="post.content"></span>
        </main>

        <footer>
            foo
        </footer>
    </div>
</template>


<script>
// let post = {	
// 	_id: ‘p101’
// 	content: ‘Im new post!’,
//     mediaUrl: ‘’
// 	userId: ‘u101’,
// 	likedBy: [‘u101’, ‘u102’, ‘u103’ ],
// 	time: 12442352,
// 	comments: [‘c101’, ‘c102’, ‘c103’, ‘c104’]
// }

let post = {
     content: '<h1>Hello <h1>',

}

export default {
    data() {
        return {
            post: post,
        }
    }
}
</script>

<style scoped>    
.post-preview {
    background-color: white;
    margin-bottom: 5px;
    border-radius: 2px;
}
</style>







