<template>
  <table>
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, colIndex) in columns" :key="colIndex">
          <template v-if="'renderHandle' in col">
            <RenderFunc
              :row="row"
              :column="col"
              :index="rowIndex"
              :render="col.renderHandle"
            ></RenderFunc>
          </template>
          <template v-else-if="'slot' in col">
            <slot :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot>
          </template>
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import RenderFunc from './render';

export default {
  name: 'SkyTable',
  components: { RenderFunc },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    console.log(this.$scopedSlots);
  },
  mounted() {
    console.log(this.$scopedSlots);
  },
};
</script>

<style>
table {
  border: 1px solid #e9e9e9;
  border-collapse: separate;
  border-spacing: 2;
  empty-cells: show;
  width: 100%;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td,
table th {
  border: 1px solid #e9e9e9;
  padding: 8px 16px;
  text-align: left;
}
</style>
