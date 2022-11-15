import * as React from "react";
import { renderWithProviders } from "../../../utils/test.utils";
import { screen } from "@testing-library/react";

import App from "../../../App";
import userEvent from "@testing-library/user-event";

test("user is not logged in", () => {
  renderWithProviders(<App />, { user: { isLoggedIn: false } });

  const loginTest = screen.getByText(/login/i);
  expect(loginTest).toBeInTheDocument();
});

test("user is logged in", () => {
  renderWithProviders(<App />, { user: { isLoggedIn: true } });

  const header = document.querySelector(".Header");

  let avatar;
  if (header)
    avatar = header.querySelector(
      "#root > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div > svg"
    );

  if (avatar) {
    userEvent.click(avatar);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  }
});
