<template>
	<div class="search-page">
		<SearchInput/>
		<Tag/>
	</div>
</template>

<script>
import SearchInput from '@/components/search/SearchInput.vue'
import Tag from '@/components/search/Tag.vue'
export default {
	components: {
		SearchInput,
		Tag
	}
}
</script>

<style lang="scss" scoped>

</style>
