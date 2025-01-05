<template>
    <div class="game-setup flex flex-col items-center gap-4 py-4">
        <h1 class="text-xl font-bold text-center">
            Place Your Ships</h1>
        <div class="setup-container flex flex-col gap-4">
            <GameBoard :grid="grid" :currentDragging="currentDragging"
                @place-ship="handlePlaceShip" />
            <div class="ships-container flex justify-between">
                <div v-for="ship in ships.filter((ship) => !ship.placed)" :key="ship.id" class="ship" draggable="true"
                    @dragstart="startDrag(ship, $event)" @dragend="endDrag">
                    <img :src="getShipImage(ship.id, ship.isVertical)" :alt="`Ship-${ship.id}`"
                        :style="shipStyle(ship)" />
                    <button @click="rotateShip(ship)">Rotate</button>
                </div>
            </div>
        </div>
        <div class="actions flex gap-4">
            <button class="text-xl font-bold m-auto" @click="confirmSetup">Confirm Placement</button>
            <button class="text-xl font-bold m-auto" @click="resetSetup">Reset</button>
            <button class="text-xl font-bold m-auto" @click="randomizeShips">Randomize</button>
        </div>
    </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";

export default {
    components: {
        GameBoard,
    },
    data() {
        return {
            grid: Array.from({ length: 10 }, () => Array(10).fill(null)), // 10x10 grid
            ships: [
                { id: 1, length: 7, isVertical: true, placed: false, position: null },
                { id: 2, length: 4, isVertical: true, placed: false, position: null },
                { id: 3, length: 6, isVertical: true, placed: false, position: null },
                { id: 4, length: 6, isVertical: true, placed: false, position: null },
                { id: 5, length: 2, isVertical: true, placed: false, position: null },
            ],
            currentDragging: null,
        };
    },
    methods: {
        getShipImage(shipId, isVertical) {
            console.log(shipId, isVertical);
            console.log(`Getting image for ship ${shipId} with orientation: ${isVertical ? "Vertical" : "Horizontal"}`);
            const images = {
                1: {
                    vertical: new URL('@/assets/images/boats/ShipBattleshipHull.png', import.meta.url).href,
                    horizontal: new URL('@/assets/images/boats/ShipBattleshipHullRotated.png', import.meta.url).href,
                },
                2: {
                    vertical: new URL('@/assets/images/boats/ShipCarrierHull.png', import.meta.url).href,
                    horizontal: new URL('@/assets/images/boats/ShipCarrierHullRotated.png', import.meta.url).href,
                },
                3: {
                    vertical: new URL('@/assets/images/boats/ShipCruiserHull.png', import.meta.url).href,
                    horizontal: new URL('@/assets/images/boats/ShipCruiserHullRotated.png', import.meta.url).href,
                },
                4: {
                    vertical: new URL('@/assets/images/boats/ShipDestroyerHull.png', import.meta.url).href,
                    horizontal: new URL('@/assets/images/boats/ShipDestroyerHullRotated.png', import.meta.url).href,
                },
                5: {
                    vertical: new URL('@/assets/images/boats/ShipPatrolHull.png', import.meta.url).href,
                    horizontal: new URL('@/assets/images/boats/ShipPatrolHullRotated.png', import.meta.url).href,
                },
            };

            return isVertical ? images[shipId].vertical : images[shipId].horizontal;
        },
        shipStyle(ship) {
            return {
                width: ship.isVertical ? '30px' : `${30 * ship.length}px`,
                height: ship.isVertical ? `${30 * ship.length}px` : '30px',
                objectFit: 'contain',
            };
        },
        startDrag(ship, event) {
            console.log(`Dragging ship:`, ship);
            this.currentDragging = { ...ship };

            const img = new Image();
            img.src = this.getShipImage(ship.id, ship.isVertical);

            img.onload = () => {
                const rect = event.target.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const offsetY = event.clientY - rect.top;

                const tileSize = 30;
                const adjustmentX = offsetX % tileSize;
                const adjustmentY = offsetY % tileSize;

                event.dataTransfer.setDragImage(img, adjustmentX, adjustmentY);
            };
        },
        rotateShip(ship) {
            ship.isVertical = !ship.isVertical;
            console.log(`Ship ${ship.id} rotated to ${ship.isVertical ? "Vertical" : "Horizontal"}`);
        },
        handlePlaceShip({ x, y }) {
            if (!this.currentDragging) {
                console.error("No ship is being dragged.");
                return;
            }

            const ship = this.currentDragging;

            console.log(
                `Attempting to place ship ${ship.id} at (${x}, ${y}) with orientation: ${ship.isVertical ? "Vertical" : "Horizontal"}`
            );

            if (ship.isVertical) {
                x = Math.max(0, Math.min(x, 10 - ship.length));
            } else {
                y = Math.max(0, Math.min(y, 10 - ship.length));
            }

            if (!this.doesShipFit(x, y, ship.length, ship.isVertical)) {
                alert("Invalid placement. Ship cannot be placed here.");
                return;
            }

            this.placeShipOnGrid(x, y, ship.length, ship.isVertical, ship.id);

            this.ships = this.ships.map((s) =>
                s.id === ship.id
                    ? { ...s, placed: true, position: { x, y } }
                    : s
            );

            console.log(`Ship ${ship.id} placed successfully at (${x}, ${y}).`);
            this.currentDragging = null;
        },
        doesShipFit(x, y, length, isVertical) {
            if (isVertical && x + length > 10) return false;
            if (!isVertical && y + length > 10) return false;

            for (let i = 0; i < length; i++) {
                const cell = isVertical ? this.grid[x + i][y] : this.grid[x][y + i];
                if (cell !== null) return false;
            }

            return true;
        },
        placeShipOnGrid(x, y, length, isVertical, shipId) {
            for (let i = 0; i < length; i++) {
                if (isVertical) {
                    this.grid[x + i][y] = shipId;
                } else {
                    this.grid[x][y + i] = shipId;
                }
            }
        },
        endDrag() {
            console.log("Drag ended");
            this.currentDragging = null;
        },
        resetSetup() {
            this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));

            this.ships = this.ships.map((ship) => ({
                ...ship,
                placed: false,
                isVertical: true,
                position: null,
            }));

            this.currentDragging = null;

            console.log("Setup has been reset.");
        },
        randomizeShips() {
            this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));

            this.ships = this.ships.map((ship) => ({
                ...ship,
                placed: false,
                isVertical: Math.random() < 0.5,
                position: null,
            }));

            this.ships.forEach((ship) => {
                let placed = false;

                while (!placed) {
                    const x = Math.floor(Math.random() * 10);
                    const y = Math.floor(Math.random() * 10);

                    if (this.doesShipFit(x, y, ship.length, ship.isVertical)) {
                        this.placeShipOnGrid(x, y, ship.length, ship.isVertical, ship.id);
                        ship.position = { x, y };
                        ship.placed = true;
                        placed = true;
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
.ship img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
}
</style>