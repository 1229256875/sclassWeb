import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React, { useState, useEffect, useRef } from "react";
import { message, Spin, Modal, Button, Input } from "antd";
import styles from "./index.less";
import G6 from "@antv/g6";
import ButtonSize from "./ButtonSize";
import { connect } from "dva";

const Faculty = props => {
  const [count, setCount] = useState(0);
  const timeOut = useRef(null);
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  //添加院系 按钮文字
  const [addButtonText, setAddButtonText] = useState("添加");
  //添加院系按钮是否可按
  const [addButtonVisible, setAddButtonVisible] = useState(false);

  //当前节点数据
  const [nodeData, setNodeData] = useState();

  const [inputText, setInputText] = useState("");
  //树
  const [graphs, setGraph] = useState(null);

  const { dispatch } = props;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const insertFaculty = () => {
    dispatch({
      type: "faculty/insertFaculty",
      payload: {
        type: nodeData.teep + 1,
        facultyName: inputText,
        parentId: nodeData.shape
      }
    }).then(rst => {
      if (rst.status === 200 && rst.data.status === 200) {
        message.success("修改成功！");
      } else {
        message.error(rst.data.msg);
      }
    });
    setCount(count + 1);
    handleCancel();
  };

  const updateFaculty = () => {
    dispatch({
      type: "faculty/updateFaculty",
      payload: {
        id: nodeData.shape,
        facultyName: inputText
      }
    }).then(rst => {
      if (rst.status === 200 && rst.data.status === 200) {
        message.success("修改成功！");
      } else {
        message.error(rst.data.msg);
      }
    });
    setCount(count + 1);
    handleCancel();
  };

  const deleteFaculty = () => {
    dispatch({
      type: "faculty/deleteFaculty",
      payload: {
        id: nodeData.shape
      }
    }).then(rst => {
      if (rst.status === 200 && rst.data.status === 200) {
        message.success("修改成功！");
      } else {
        message.error(rst.data.msg);
      }
    });
    setCount(count + 1);
    handleCancel();
  };

  // const create = (x, y, data) => {
  //   const tree = (new G6.TreeGraph({
  //     container: 'container',
  //     x,
  //     y,
  //     linkCenter: false,
  //     modes: {
  //       default: [
  //         {
  //           type: 'collapse-expand',
  //           onChange: function onChange(item, collapsed) {
  //             const data = item.get('model').data;
  //             data.collapsed = collapsed;
  //             return true;
  //           },
  //           onSelect: function onSelect(item, collapsed) {
  //           },
  //           onDeselect: function onDesekect(item, collapsed) {
  //           },
  //         },
  //         'drag-canvas',
  //         'zoom-canvas',
  //         'drag-node',
  //       ],
  //     },
  //     defaultNode: {
  //       size: 25,
  //       style: {
  //         fill: '#C6E5FF',
  //         stroke: '#5B8FF9',
  //       },
  //     },
  //     defaultEdge: {
  //       style: {
  //         stroke: '#A3B1BF',
  //       },
  //     },
  //     layout: {
  //       type: 'dendrogram',
  //       direction: 'LR',
  //       nodeSep: 20,
  //       rankSep: 100,
  //       radial: true,
  //     },
  //   }));
  //   setGraph(tree);
  //   return tree;
  // };

  useEffect(() => {
    dispatch({
      type: "faculty/getFacultyAll"
    }).then(data => {
      if (graphs) {
        graphs.changeData(data);
        graphs.fitView();
      } else {
        const width = document.getElementById("container").scrollWidth;
        const height = document.getElementById("container").scrollHeight || 700;
        // create(width, height, data);
        const graph = new G6.TreeGraph({
          container: "container",
          width,
          height,
          linkCenter: false,
          modes: {
            default: [
              {
                type: "collapse-expand",
                onChange: function onChange(item, collapsed) {
                  const data = item.get("model").data;
                  console.log("data", item);
                  data.collapsed = collapsed;
                  return true;
                },
                onSelect: function onSelect(item, collapsed) {},
                onDeselect: function onDesekect(item, collapsed) {}
              },
              "drag-canvas",
              "zoom-canvas",
              "drag-node"
            ]
          },
          defaultNode: {
            size: 25,
            style: { fill: "#C6E5FF", stroke: "#5B8FF9" },
          },
          defaultEdge: {
            style: {
              stroke: "#A3B1BF"
            }
          },
          layout: {
            type: "dendrogram",
            direction: "LR",
            nodeSep: 20,
            rankSep: 100,
            radial: true
          }
        });
        graph.on("node:mouseenter", e => {
          // message.error(ev);
          timeOut.current = setTimeout(() => {
            const nodeItem = e.item.defaultCfg.model;
            console.log(nodeItem);
            setNodeData(nodeItem);
            setInputText(nodeItem.id);
            if (nodeItem.teep === -1) {
              setAddButtonText("添加学院");
              setAddButtonVisible(false);
            } else if (nodeItem.teep === 0) {
              setAddButtonText("添加专业");
              setAddButtonVisible(false);
            } else {
              setAddButtonText("添加");
              setAddButtonVisible(true);
            }
            setVisible(true);
          }, 2000);
        });

        graph.on("node:mouseout", e => {
          clearTimeout(timeOut.current);
        });

        graph.node(function(node) {
          return {
            label: node.id
          };
        });
        graph.data(data);
        graph.render();
        graph.fitView();

        setGraph(graph);
      }
    });
  }, [count]);

  return (
    <PageHeaderWrapper className={styles.main}>
      <Modal
        title="学院管理"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          placeholder="Basic usage"
          defaultValue={inputText}
          value={inputText}
          onChange={e => {
            setInputText(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={insertFaculty}
          disabled={addButtonVisible}
        >
          {addButtonText}
        </Button>
        <Button onClick={updateFaculty}>修改</Button>
        <Button type="dashed" onClick={deleteFaculty}>
          删除
        </Button>
      </Modal>
      <div id={"container"}></div>
      <Spin spinning={loading} size="large"></Spin>
    </PageHeaderWrapper>
  );
};

export default connect()(Faculty);
