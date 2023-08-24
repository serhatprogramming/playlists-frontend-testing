import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Section from "./Section";
import "@testing-library/jest-dom";

let title, content;

beforeEach(() => {
  title = "Sample Title";
  content = "Sample Content";
  render(
    <Section componentTitle={title}>
      <p>{content}</p>
    </Section>
  );
});

test("<Section> initial show title but not the children", () => {
  const titleElement = screen.getByText(title);
  const contentElement = screen.queryByText(content);

  expect(titleElement).toBeInTheDocument();
  expect(contentElement).not.toBeInTheDocument();
});

test("<Section> clicking on show details button reveals the children", () => {
  const showDetailsButton = screen.getByText("Show Details");
  userEvent.click(showDetailsButton);

  const contentElement = screen.getByText(content);
  expect(contentElement).toBeInTheDocument();
});

test("<Section> clicking on show details button reveals hide details button", () => {
  const showDetailsButton = screen.getByText("Show Details");
  userEvent.click(showDetailsButton);

  const hideDetailsButton = screen.getByText("Hide Details");
  const showDetailsButtonAfterClick = screen.queryByText("Show Details");

  expect(hideDetailsButton).toBeInTheDocument();
  expect(showDetailsButtonAfterClick).not.toBeInTheDocument();
});

test("<Section> clicking on show details reveals children and hides title", () => {
  const showDetailsButton = screen.getByText("Show Details");
  userEvent.click(showDetailsButton);

  const contentElement = screen.getByText("Sample Content");
  const titleElement = screen.queryByText("Sample Title");

  expect(contentElement).toBeInTheDocument();
  expect(titleElement).not.toBeInTheDocument();
});

test("<Section> hide details button functionality", () => {
  const showDetailsButton = screen.getByText("Show Details");
  userEvent.click(showDetailsButton);

  const hideDetailsButton = screen.getByText("Hide Details");
  userEvent.click(hideDetailsButton);

  const revealedTitle = screen.getByText(title);
  const revealedShowDetailsButton = screen.getByText("Show Details");
  const hiddenContent = screen.queryByText(content);

  expect(revealedTitle).toBeInTheDocument();
  expect(revealedShowDetailsButton).toBeInTheDocument();
  expect(hiddenContent).not.toBeInTheDocument();
});
