export const createAction = (type) => {
  if (type === "email") {
    return createEmailAction();
  }
  if (type === "meeting") {
    return createMeetingAction();
  }
};

const genNodeId = () => {
  return `node_${Date.now()}`;
};

const genNodePosition = () => {
  return { x: 200 + Math.random() * 250, y: 200 + Math.random() * 150 };
};

const createEmailAction = () => {
  return {
    id: "email_" + genNodeId(),
    label: "Email",
    data: {
      label: "E-Mail",
      to: [{ id: "0", value: "example.com" }],
      from: "example.com",
      subject: "subject",
      body: "body",
    },
    type: "email",
    position: genNodePosition(),
  };
};

const createMeetingAction = () => {
  return {
    id: "meeting_" + genNodeId(),
    data: {
      label: "Meeting",
      emails: [{ id: "0", value: "example.com" }],
      location: "example location",
    },
    type: "meeting",
    position: genNodePosition(),
  };
};
