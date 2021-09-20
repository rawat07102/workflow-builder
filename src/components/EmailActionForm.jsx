import React from "react";
import Input from "./Input";

const EmailActionForm = ({ onSave, initialData }) => {
  const [data, setData] = React.useState(initialData);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onEmailChange = (value, id) => {
    setData((prev) => ({
      ...prev,
      to: [...prev.to.filter((p) => p.id !== id), { id, value }],
    }));
  };
  const handleAdd = () => {
    setData((prev) => ({
      ...prev,
      to: [...prev.to, { id: Date.now(), value: "" }],
    }));
  };

  return (
    <div className="flex flex-col p-2">
      <div className="w-64">
        <div className="flex flex-col justify-between w-full">
          {data.to.map(({ id, value }) => (
            <Input
              key={id}
              className="my-2"
              label="To"
              value={value}
              onChange={(e) => onEmailChange(e.target.value, id)}
            />
          ))}
          <button className="btn btn-primary mt-2" onClick={handleAdd}>
            Add
          </button>
          <Input
            label="From"
            name="from"
            value={data.from}
            className="my-2"
            onChange={onChange}
          />
          <Input
            label="Subject"
            name="subject"
            value={data.subject}
            className="my-2"
            onChange={onChange}
          />
          <Input
            label="Body"
            name="body"
            value={data.body}
            className="my-2"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={() => onSave(data)} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};

export default EmailActionForm;
