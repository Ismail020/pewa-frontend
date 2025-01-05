<template>
    <div class="game-board-container">
        <!-- Column letters -->
        <div class="column-headers ml-[30px]">
            <div v-for="(col, colIndex) in grid[0]" :key="'header-' + colIndex" class="header-cell">
                {{ String.fromCharCode(65 + colIndex) }}
            </div>
        </div>
        <div class="game-board">
            <!-- Grid rows with row numbers -->
            <div v-for="(row, rowIndex) in grid" :key="'row-' + rowIndex" class="row">
                <!-- Row number -->
                <div class="header-cell">{{ rowIndex + 1 }}</div>
                <!-- Row cells -->
                <div v-for="(cell, colIndex) in row" :key="'cell-' + rowIndex + '-' + colIndex" class="cell" :class="{
                    occupied: cell !== null
                }" @dragover.prevent="onDragOver(rowIndex, colIndex)" @drop="dropShip(rowIndex, colIndex)">
                    <span v-if="cell !== null">{{ cell }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        grid: Array,
    },
    methods: {
        dropShip(rowIndex, colIndex) {
            this.$emit("place-ship", { x: rowIndex, y: colIndex });
        },
    },
};
</script>

<style scoped>
.game-board-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.column-headers {
    display: flex;
    width: 100%;
    justify-content: center;
}

.header-cell {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
}

.game-board {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
}

.cell {
    width: 30px;
    height: 30px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cell.occupied {
    background-color: blue;
    color: white;
}

.cell.highlighted {
    background-color: rgba(0, 255, 0, 0.5);
    /* Highlight cells */
}
</style>