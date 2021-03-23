import useForm from "./customHooks";

import { Form, Button } from "react-bootstrap";

import * as Joi from "joi";

function CustomForm(props) {
  let validation = {};
  for (let key in props.fields) {
    let field = props.fields[key];
    let id = field.id;
    validation[id] = joiValidationField(field);
  }
  const schema = Joi.object(validation);

  function joiValidationField(field) {
    let validationField;

    if (field.type === "number") {
      validationField = Joi.number();
    } else {
      validationField = Joi.string();
    }
    if (field.type === "email") {
      validationField = validationField.email({ tlds: { allow: false } });
    }

    if (field.hasOwnProperty("pattern")) {
      validationField = validationField.pattern(new RegExp(field.pattern));
    }

    if (field.hasOwnProperty("alphanum") && field.alphanum === true) {
      validationField = validationField.alphanum();
    }
    if (field.hasOwnProperty("min")) {
      validationField = validationField.min(field.min);
    }
    if (field.hasOwnProperty("max")) {
      validationField = validationField.max(field.max);
    }
    if (field.hasOwnProperty("requires") && field.required === true) {
      validationField = validationField.required();
    }
    return validationField;
  }
  const { handleSubmit, handleInputChange, errors } = useForm(schema);

  const formFields = props.fields.map((field) => {
    return (
      <Form.Group>
        <Form.Label>{field.name}</Form.Label>
        <Form.Control
          type={field.type}
          id={field.id}
          name={field.id}
          placeholder = {field.hasOwnProperty("placeholder") && field.placeholder}
          onChange={handleInputChange}
        ></Form.Control>
      </Form.Group>
    );
  });

  return (
    <Form onSubmit={handleSubmit}  className="m-5">
      {formFields}
      <div>
        <p>{errors.toString()}</p>
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default CustomForm;
