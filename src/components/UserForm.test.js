import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };
  render(<UserForm onUserAdd={callback} />);

  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  userEvent.click(nameInput);
  userEvent.keyboard("Michael");

  userEvent.click(emailInput);
  userEvent.keyboard("michael@hotmail.com");

  const button = screen.getByRole("button");

  userEvent.click(button);

  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({
    name: "Michael",
    email: "michael@hotmail.com",
  });
});
