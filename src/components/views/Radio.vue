<template>
    <div class="page book">
        <v-header/>
        <h1>Radio Page</h1>
    </div>
</template>

<script>
    import Header from '@/components/common/Header'
    import Footer from '@/components/common/Footer'
    export default{
        components:{
            'v-header':Header,
            'v-footer':Footer
        }
    }
</script>

<style scoped>

</style>
