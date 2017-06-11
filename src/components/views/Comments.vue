<template>
    <div>i am comments view</div>
</template>

<script>
    export default{
        mounted(){
            this.$http({
                method: 'get',
                url: `api/movie/subject/${this.$route.params.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b`,
                responseType: 'json',
                   timeout: 10000,
            }).then((res)=> {
                console.log(res.data);
            }).catch((err)=> {
                console.log(err);
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>
