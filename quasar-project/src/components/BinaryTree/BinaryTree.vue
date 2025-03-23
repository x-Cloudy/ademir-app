<template>
  <div ref="treeContainer" style="width: 100%; height: 100vh;">
  </div>
</template>

<script>
import * as d3 from "d3";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    treeData: Object,
  },
  setup(props) {
    const treeContainer = ref(null);

    onMounted(() => {
      if (props.treeData) {
        createTree(props.treeData);
      }
    });

    function createTree(data) {
      // Remove qualquer SVG anterior
      d3.select(treeContainer.value).select("svg").remove();

      // Cria o SVG ocupando todo o espaço do container
      const svg = d3
        .select(treeContainer.value)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        // Usaremos viewBox para redimensionar e centralizar
        .attr("preserveAspectRatio", "xMidYMid meet");

      // Cria um grupo principal para desenhar os elementos
      const g = svg.append("g");

      // Monta a hierarquia a partir dos dados
      const hierarchyData = d3.hierarchy(data, (d) => {
        return d.left || d.right ? [d.left, d.right].filter(Boolean) : null;
      });

      // Define o layout da árvore
      const treeLayout = d3.tree().size([600, 500]);
      const treeData = treeLayout(hierarchyData);

      // Desenha os links (curvas) entre nós
      g.selectAll("path")
        .data(treeData.links())
        .enter()
        .append("path")
        .attr("d", (d) =>
          `M${d.source.x},${d.source.y}
           C${d.source.x},${(d.source.y + d.target.y) / 2}
            ${d.target.x},${(d.source.y + d.target.y) / 2}
            ${d.target.x},${d.target.y}`
        )
        .style("fill", "none")
        .style("stroke", "#999")
        .style("stroke-width", "2px");

      // Desenha os nós (circles)
      g.selectAll("circle")
        .data(treeData.descendants())
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 30)
        .style("fill", "#000000")
        .style("stroke", "#000")
        .style("stroke-width", "2px")
        .style("filter", "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))")
        .on("click", (event, d) => {
          console.log(d.data.sidePreference);
        });

      // Desenha os textos (labels)
      g.selectAll("text")
        .data(treeData.descendants())
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y + 5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-family", "Arial, sans-serif")
        .style("fill", "#F2C037")
        .text((d) => d.data.name)
        .on("click", (event, d) => {
          console.log(d.data.sidePreference);
        });

      // ------------------------------------
      // 1) Calcular bounding box (minX, maxX, minY, maxY)
      // ------------------------------------
      const nodes = treeData.descendants();
      const xValues = nodes.map((d) => d.x);
      const yValues = nodes.map((d) => d.y);

      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // Margem para não ficar colado na borda
      const margin = 50;

      // Largura e altura do conteúdo da árvore
      const contentWidth = maxX - minX + margin * 2;
      const contentHeight = maxY - minY + margin * 2;

      // ------------------------------------
      // 2) Aumentar o viewBox em 2x => conteúdo fica 2x menor
      // ------------------------------------
      const scale = 1.5;
      svg.attr(
        "viewBox",
        // minX e minY não mudam, mas a largura e altura são dobradas
        `${minX - margin} ${minY - margin} ${contentWidth * scale} ${contentHeight * scale}`
      );
    }

    return { treeContainer };
  },
});
</script>