<template>
  <div class="q-pa-md">
    <q-table flat bordered :rows="mock" :columns="tableColumn" row-key="name">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in cols(props)" :key="col.name" :props="props" class="bg-primary text-white">
            {{
              col.label
            }}
          </q-th>
        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script setup lang="ts">
import tableColumn from './components/tableColumns';

type Col = { cols: { value: unknown; name: string; label: string }[] }
const cols = (props: Col) => props.cols

const mock = [
  {
    id: 1,
    name: 'user 1',
    wpp: '123213132'
  },
  {
    id: 2,
    name: 'user 2',
    wpp: '123213132'
  },
  {
    id: 3,
    name: 'user 3',
    wpp: '123213132'
  }
] as any

</script>