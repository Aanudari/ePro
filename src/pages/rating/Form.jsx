import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function DynamicForm() {
  const [children, setChildren] = useState([]);

  const addChild = () => {
    setChildren([...children, { value: "" }]);
  };

  const removeChild = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  const handleInputChange = (index, event) => {
    const newChildren = [...children];
    newChildren[index].value = event.target.value;
    setChildren(newChildren);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(children);
  };

  const renderChildren = () => {
    return children.map((child, index) => (
      <Form.Group key={index}>
        <Form.Control
          type="text"
          placeholder="Enter value"
          value={child.value}
          onChange={(e) => handleInputChange(index, e)}
        />
        <Button onClick={() => removeChild(index)}>Устгах</Button>
      </Form.Group>
    ));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {renderChildren()}
      <Button onClick={addChild}>Нэмэх</Button>
      <Button type="submit">Хадгалах</Button>
    </Form>
  );
}
