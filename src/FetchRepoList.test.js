import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FetchRepoList from "./FetchRepoList";

const sampleRepos = [
	{ name: "Repo1", stargazers_count: 10, description: "Description1" },
	{ name: "Repo2", stargazers_count: 5, description: "Description2" }
];

describe("FetchRepoList Component", () => {
	it("renders the list of repositories correctly", () => {
		render(<FetchRepoList repos={sampleRepos} />);
		sampleRepos.forEach((repo) => {
			expect(screen.getByText(`${repo.name}`)).toBeInTheDocument();
			expect(screen.getByText(`${repo.stargazers_count}`)).toBeInTheDocument();
			expect(screen.getByText(`${repo.description}`)).toBeInTheDocument();
		});
	});
});
