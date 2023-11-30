import { describe, it, vi, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Post } from "./PostItem";
import mockRouter from "next-router-mock";

// +++ STEPS +++
// ********* Arrange *********

// - Create relevant objects and data
// - Setup mocks

// *********** Act ***********

// - Render a component
// - Render a hook
// - Call a function
// - Perform some actions on a component
// - ...

// ********** Assert *********

// - expect(...).toBe...
// - ...

// Create relevant objects and data
const POST_DATA: Post = {
  id: "post1",
  body: "This is a post",
  createdAt: "2022-10-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
  userId: "user1",
  likedIds: Array.from({ length: 123 }),
  image: null,
  user: {
    id: "43535345345435345",
    name: "Timo Test",
    username: "Timo",
    bio: null,
    email: null,
    emailVerified: null,
    image: null,
    coverImage: null,
    profileImage: null,
    hashedPassword: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    followingIds: [],
    hasNotification: null,
  },
  comments: Array.from({ length: 999 }),
};

// Setup mocks
vi.mock("next/router", () => require("next-router-mock"));

vi.mock("@/hooks/useLike", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    hasLiked: true,
    toggleLike: vi.fn(),
  })),
}));

describe("PostItem.tsx", () => {
  it("should navigate to post details page when clicking on post", async () => {
    // Import code under test
    const PostItem = await import("./PostItem").then((m) => m.default);

    // Render component
    const { container } = render(<PostItem data={POST_DATA} />);

    // Click on post
    fireEvent.click(container.firstChild as ChildNode);

    // Assertions
    expect(mockRouter).toMatchObject({
      asPath: `/posts/${POST_DATA.id}`,
    });
  });

  it("should render avatar, name, username, count likes and count comments", async () => {
    // Import code under test
    const PostItem = await import("./PostItem").then((m) => m.default);

    // Render component
    const { getByText, getByAltText } = render(<PostItem data={POST_DATA} />);

    // Assertions
    expect(getByAltText("Avatar")).toBeDefined();
    expect(getByText("Timo Test")).toBeDefined();
    expect(getByText("@Timo")).toBeDefined();
    expect(getByText("This is a post")).toBeDefined();
    expect(getByText("This is a post")).toBeDefined();
    expect(getByText("123")).toBeDefined();
    expect(getByText("999")).toBeDefined();
  });

  it("should render the relative 'created at' time", async () => {
    // Import code under test
    const PostItem = await import("./PostItem").then((m) => m.default);

    // Render component
    const { getByText } = render(<PostItem data={POST_DATA} />);

    // Assertion
    expect(getByText("1 year")).toBeDefined();
  });

  it("should render a red heart if the logged in user has liked a post", async () => {
    // Import code under test
    const PostItem = await import("./PostItem").then((m) => m.default);

    // Render component
    render(<PostItem data={POST_DATA} />);

    // Get SVGs
    const [_, likeSvg] = document.querySelectorAll("svg");

    // Get color of like SVG
    const likeSvgColor = window
      .getComputedStyle(likeSvg)
      .getPropertyValue("color");

    expect(likeSvgColor).toBe("red");
  });
});
