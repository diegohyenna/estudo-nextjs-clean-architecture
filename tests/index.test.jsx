import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  // it("renders a heading", () => {
  //   render(<Home />);

  //   const heading = screen.findAllByTitle("TESTE NATY");

  //   heading.then((res) => console.log(res));

  //   expect(heading).toBeInTheDocument();
  // });

  it("título da página Home", async () => {
    const textContent = "Olá, me chamo Diego Guimarães Martins";

    render(<Home />);

    // await userEvent.click(screen.getByText("Load Greeting"));
    const text = await screen.getByText(textContent);

    expect(text).toHaveTextContent(textContent);
  });
});
