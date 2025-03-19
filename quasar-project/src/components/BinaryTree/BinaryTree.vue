<template>
  <div ref="treeContainer"></div>
</template>

<script>
import * as d3 from "d3";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    treeData: Object, // A árvore binária como um objeto JSON
  },
  setup(props) {
    const treeContainer = ref(null);

    onMounted(() => {
      if (props.treeData) {
        createTree(props.treeData);
      }
    });

    function createTree(data) {
      const width = 600;
      const height = 400;

      const svg = d3
        .select(treeContainer.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50,50)");

      const hierarchyData = d3.hierarchy(data, (d) => {
        return d.left || d.right ? [d.left, d.right].filter(Boolean) : null;
      });
      const treeLayout = d3.tree().size([400, 300]);
      const treeData = treeLayout(hierarchyData);

      const link = d3.linkHorizontal()
        .x((d) => d.x)
        .y((d) => d.y);

      svg
        .selectAll("path")
        .data(treeData.links())
        .enter()
        .append("path")
        .attr("d", (d) => `M${d.source.x},${d.source.y} C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`)
        .style("fill", "none")
        .style("stroke", "#999")  // Cinza claro
        .style("stroke-width", "2px");

      const nodes = svg
        .selectAll("circle")
        .data(treeData.descendants())
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 30)  // Aumentando o tamanho do nó
        .style("fill", (d) => d.data.sidePreference === "left" ? "#000000" : "#000000") // Azul para esquerda, vermelho para direita
        .style("stroke", "#000")  // Borda preta
        .style("stroke-width", "2px")
        .style("filter", "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))"); // Sombra para um efeito 3D


      svg
        .selectAll("text")
        .data(treeData.descendants())
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y + 5)
        .attr("text-anchor", "middle") // Centraliza o texto
        .style("font-size", "14px")
        .style("font-family", "Arial, sans-serif")
        .style("fill", "#F2C037") // Texto branco para contraste
        .text((d) => d.data.name);
    }

    return { treeContainer };
  },
});
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
}
</style>
