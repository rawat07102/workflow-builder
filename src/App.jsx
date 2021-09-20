import React from "react";
import ReactFlow, {
  isNode,
  removeElements,
  addEdge,
} from "react-flow-renderer";
import Drawer from "./components/Drawer";
import EmailActionForm from "./components/EmailActionForm";
import EmailNode from "./components/EmailNode";
import MeetingActionForm from "./components/MeetingActionForm";
import MeetingNode from "./components/MeetingNode";
import { createAction } from "./lib/generators";

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [elements, setElements] = React.useState([]);
  const [selectedNode, setSelectedNode] = React.useState(null);

  const handleCreateAction = (type) => {
    const newNode = createAction(type);
    setElements((prev) => [...prev, newNode]);
    onElementClick(null, newNode);
  };
  const handleClear = () => {
    setElements([]);
    closeSidePanel();
  };
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
    closeSidePanel();
  };
  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };
  const closeSidePanel = () => {
    setOpen(false);
    setSelectedNode(null);
  };
  const handleActionSave = (data) => {
    setElements((prev) => [
      ...prev.filter((el) => el.id !== selectedNode.id),
      {
        ...selectedNode,
        data,
      },
    ]);
    closeSidePanel();
  };
  const onElementClick = (_event, element) => {
    if (selectedNode?.id !== element.id && isNode(element)) {
      setOpen(true);
      setSelectedNode(element);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex pt-2">
        <ReactFlow
          onPaneClick={closeSidePanel}
          onElementClick={onElementClick}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          elements={elements}
          nodeTypes={{ email: EmailNode, meeting: MeetingNode }}
          deleteKeyCode="Backspace"
          className="flex-1"
        />
        <div className="flex flex-col pr-2">
          <button
            className="btn btn-primary"
            onClick={() => handleCreateAction("email")}
          >
            Add Email Action
          </button>
          <button
            className="btn btn-primary mt-2"
            onClick={() => handleCreateAction("meeting")}
          >
            Add Meeting Action
          </button>
          <button className="btn btn-primary mt-2" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      <Drawer
        open={open}
        onClose={closeSidePanel}
        className="max-w-sm w-full bg-gray-200 p-2"
      >
        <div className="mb-2 flex items-center">
          <h1 className="text-teal-600 text-2xl font-bold italic">
            {selectedNode?.data.label}
          </h1>
          <button
            onClick={() => onElementsRemove([selectedNode])}
            className="btn btn-primary ml-auto"
          >
            Remove
          </button>
        </div>
        {selectedNode && selectedNode.type === "email" && (
          <EmailActionForm
            initialData={selectedNode.data}
            onSave={handleActionSave}
          />
        )}
        {selectedNode && selectedNode.type === "meeting" && (
          <MeetingActionForm
            initialData={selectedNode.data}
            onSave={handleActionSave}
          />
        )}
      </Drawer>
    </>
  );
};

export default App;
