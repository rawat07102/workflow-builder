import { Handle } from "react-flow-renderer";

const EmailNode = ({ data, isConnectable }) => {
  return (
    <div
      style={{ minWidth: 150 }}
      className="shadow-lg overflow-hidden rounded-2xl w-max max-w-xs"
    >
      <Handle
        id="1"
        type="target"
        position="top"
        isConnectable={isConnectable}
      />
      <Handle
        id="2"
        type="source"
        position="bottom"
        isConnectable={isConnectable}
      />
      <div className="bg-teal-600 px-2 w-full text-white truncate text-center">
        <span className="italic capitalize text-xl ">{data.subject}</span>
      </div>
      <div className="bg-gray-300 px-2">
        <div className="flex flex-col items-center py-2">
          {data.to.map(({ id, value }) => (
            <span key={id}>{value}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailNode;
