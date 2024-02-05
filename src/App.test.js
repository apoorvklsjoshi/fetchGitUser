import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App Component", () => {
	it("fetches user list on button click", async () => {
		render(<App />);

		fireEvent.change(screen.getByRole("textbox"), {
			target: { value: "someUser" }
		});
		fireEvent.click(screen.getByText("Search"));
		await screen.findByText('Showing users for "someUser"');
	});
});
