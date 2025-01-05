<template>
<div class="ship" :style="shipStyle">
    <div v-for="block in length" :key="block" class="block"></div>
</div>
</template>

<script>
export default {
props: {
    length: Number,
    isVertical: Boolean,
},
computed: {
    shipStyle() {
        return {
            display: 'flex',
            flexDirection: this.isVertical ? 'column' : 'row',
            gap: '2px',
        };
    },
},
};
</script>

<style scoped>
.block {
width: 30px;
height: 30px;
background-color: blue;
border: 1px solid white;
}
</style>