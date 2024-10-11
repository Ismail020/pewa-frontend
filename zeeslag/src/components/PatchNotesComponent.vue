<template>
    <div class="patch-notes bg-gray-800 text-white p-4 rounded-md">
      <h2 class="text-xl font-bold mb-4">Patch Notes</h2>
      <ul>
        <li v-for="note in patchNotes" :key="note.id" class="mb-3">
          <div class="text-sm text-gray-400">{{ note.date }}</div>
          <div class="text-lg">{{ note.description }}</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PatchNotesComponent',
    data() {
      return {
        patchNotes: [
          { id: 1, date: '18/08/2023', description: 'Added new monkey mode' },
          { id: 2, date: '24/09/2023', description: 'Insane new gamemode added!' },
          { id: 3, date: '26/07/2023', description: 'Minor bugfixes' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .patch-notes {
    max-width: 400px; /* Pas dit aan naar wens */
  }
  </style>
  