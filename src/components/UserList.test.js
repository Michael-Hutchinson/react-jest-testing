import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test("render one row per user", () => {
  const users = [
    { name: "Jane", email: "jane@hotmail.com" },
    { name: "Sam", email: "sam@hotmail.com" },
  ];

  render(<UserList users={users} />);

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("render one row per user without using data-testid", () => {
  const users = [
    { name: "Jane", email: "jane@hotmail.com" },
    { name: "Sam", email: "sam@hotmail.com" },
  ];

  const { container } = render(<UserList users={users} />);

  // eslint-disable-next-line
  const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2);
});

test("render the email and name of each users", () => {
  const users = [
    { name: "Jane", email: "jane@hotmail.com" },
    { name: "Sam", email: "sam@hotmail.com" },
  ];

  render(<UserList users={users} />);

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
