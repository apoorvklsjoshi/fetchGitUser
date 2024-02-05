import "./App.css";
import { useState, useRef } from "react";
import FetchRepoList from "./FetchRepoList";

interface GitUser {
	login: string;
}

interface Repo {
	name: string;
	stargazers_count: number;
	description: string;
}

function App() {
	const [gitList, setGitList] = useState<GitUser[] | null>(null);
	const [repoList, setRepoList] = useState<Repo[]>([]);
	const [userName, setUserName] = useState<string>("");
	const [activeUser, setActiveUser] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const apiEndPoint = "https://api.github.com/search/users?q=";
	const userRepoEndPoint = "https://api.github.com/users/";
	const loading = <div className="loading">&#9991;</div>;
	const noData = (
		<label className="noData" data-testid="noData">
			No Data
		</label>
	);

	const getUserList = async () => {
		try {
			if (inputRef.current) {
				let fetchUserList = await fetch(
					apiEndPoint + inputRef.current.value + "&per_page=5"
				);
				let data = await fetchUserList.json();
				setGitList(data.items);
				setUserName(inputRef.current.value);
				setActiveUser(null);
				setRepoList([]);
			}
		} catch (error) {
			console.error("Error fetching user list:", error);
		}
	};

	const getUserRepo = async (user: string, ind: number) => {
		setIsLoading(true);
		setRepoList([]);
		let fetchRepoList = await fetch(userRepoEndPoint + user + "/repos");
		let result = await fetchRepoList.json();
		setRepoList(result);
		setActiveUser(ind);
		setIsLoading(false);
	};

	const renderRepoList = (repoList: Repo[]) => {
		if (repoList.length) {
			return <FetchRepoList repos={repoList} />;
		} else if (isLoading) {
			return loading;
		} else {
			return noData;
		}
	};

	return (
		<div className="App">
			<div className="body">
				<div className="searchPanel">
					<input id="searchInput" ref={inputRef} type="input" />
					<button className="searchButton" onClick={() => getUserList()}>
						Search
					</button>
					{!!gitList && (
						<div className="resultPanel">
							<div className="userName">Showing users for "{userName}"</div>
							{gitList?.map((res, ind) => {
								return (
									<details key={ind} open={activeUser === ind}>
										<summary
											className="tabHead"
											onClick={() => getUserRepo(res?.login, ind)}
										>
											<div>{res?.login}</div>
										</summary>
										{renderRepoList(repoList)}
									</details>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
