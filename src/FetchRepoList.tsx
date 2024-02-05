import React from "react";

interface Repo {
	name: string;
	stargazers_count: number;
	description: string;
}

interface FetchRepoListProps {
	repos: Repo[];
}

const FetchRepoList: React.FC<FetchRepoListProps> = (props) => {
	return (
		<>
			{props.repos?.map((repo, index) => (
				<div className="tabContent" key={index}>
					<div className="repTitle">
						<div>
							<label>Repository title</label>
							<span>{repo?.name}</span>
						</div>
						<label className="star">
							{repo?.stargazers_count} <span>&#10031;</span>
						</label>
					</div>
					<div className="repDescription">
						<div className="repDetails">
							<label>{repo?.description}</label>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default FetchRepoList;
