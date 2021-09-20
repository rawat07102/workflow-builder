import React from "react";
import Input from "./Input";

const MeetingActionForm = ({ onSave, initialData }) => {
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
      emails: [...prev.emails.filter((p) => p.id !== id), { id, value }],
    }));
  };
  const handleAdd = () => {
    setData((prev) => ({
      ...prev,
      emails: [...prev.emails, { id: Date.now(), value: "" }],
    }));
  };

  return (
    <div className="flex flex-col p-2">
      <div className="w-64">
        <div className="flex flex-col justify-between w-full">
          <Input
            label="Location"
            name="location"
            value={data.location}
            className="my-2"
            onChange={onChange}
          />
          {data.emails.map(({ id, value }) => (
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

export default MeetingActionForm;
