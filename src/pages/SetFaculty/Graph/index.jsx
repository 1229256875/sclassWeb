import {useEffect, useState} from "react";
import G6 from "@antv/g6";
import constants from "@antv/data-set/src/constants";


const Graph = () => {

  const [data, setData] = useState({});
  const [width, setWidth] = useState(1000);
  const [height, setHeigth] = useState(500);



  useEffect(() => {

    setTimeout(() => {

    }, 2000);
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setWidth(document.getElementById('container').scrollWidth);
        setHeigth(document.getElementById('container').scrollHeight || 1000);

        const graph = new G6.TreeGraph({
          container: 'container',
          width,
          height,
          linkCenter: true,
          modes: {
            default: [
              {
                type: 'collapse-expand',
                onChange: function onChange(item, collapsed) {
                  const data = item.get('model').data;
                  data.collapsed = collapsed;
                  return true;
                },
              },
              'drag-canvas',
              'zoom-canvas',
              'drag-node',
            ],
          },
          defaultNode: {
            size: 25,

            style: {
              fill: '#C6E5FF',
              stroke: '#5B8FF9',
            },
          },
          defaultEdge: {
            style: {
              stroke: '#A3B1BF',
            },
          },
          layout: {
            type: 'dendrogram',
            direction: 'LR',
            nodeSep: 20,
            rankSep: 100,
            radial: true,
          },
        });

        graph.node(function (node) {
          return {
            label: node.id,
          };
        });

        graph.data(data);
        graph.render();
        graph.fitView();
      });
  }, []);


  useEffect(()=>{

  },[data])
}

export default Graph;
