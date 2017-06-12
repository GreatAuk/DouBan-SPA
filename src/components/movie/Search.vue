<template>
    <div class="search-page">
        <SearchInput/>
        <Tag/>
    </div>
</template>

<script>
    import SearchInput from './SearchInput.vue'
    import Tag from './Tag.vue'
    export default{
        components:{
            SearchInput,
            Tag
        }
    }
</script>

<style lang="scss" scoped>

</style>
