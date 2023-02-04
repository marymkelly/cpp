import { useState } from "react";

export default function ProjectForm() {
	const [project, setProjectData] = useState({
		ownerId: "",
		name: "",
		description: "",
		category: "", // project category for folder / organization (versus type)
		status: "",
		dates: [{ startDate: "", endDate: "" }],
		type: "", // label for type of project
		role: { title: "", description: "" },
		client: {
			name: "",
			industry: "",
		},
		teamSize: 1,
		url: "",
		files: [],
		tags: [],
		tools: [],
		logs: [],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", project);
		console.log(project);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === "startDate") {
			setProjectData({
				...project,
				dates: [{ ...project.dates[0], startDate: value }],
			});
		} else if (name === "endDate") {
			setProjectData({
				...project,
				dates: [{ ...project.dates[0], endDate: value }],
			});
		} else {
			setProjectData({
				...project,
				[name]: value,
			});
		}
	};


	return (
		<div className='create-project-form'>
			<h1 className='primary-navy'>New Project</h1>
			<form onSubmit={handleSubmit}>
				<input name='name' placeholder='Project Name *' type='text' value={project.name} onChange={handleInputChange} />
				<input name='description' placeholder='Description' type='text' value={project.description} onChange={handleInputChange} />
				<select name='category' value={project.category} defaultValue="" onChange={handleInputChange}>
					<option value='' disabled={true}>
						Catagory
					</option>
					<option value='work'>work</option>
					<option value='personal'>personal</option>
					<option value='school'>school</option>
				</select>
				<label className='primary-navy'>
					Start Date
					<input id='startDate' type='date' name='startDate' value={project.dates.startDate} onChange={handleInputChange} />
				</label>
				<label className='primary-navy'>
					End Date
					<input type='date' name='endDate' value={project.dates.endDate} onChange={handleInputChange} />
				</label>
				<select name='status' value={project.status} onChange={handleInputChange}>
					<option disabled={true} value=''>
						Status
					</option>
					<option value='active'>Active</option>
					<option value='pending'>Pending</option>
					<option value='upcoming'>upcoming</option>
					<option value='overdue'>Overdue</option>
					<option value='suspended'>Suspended</option>
				</select>
				<div className="form-card-1">
					<span className="dots active"></span>
					<span className="dots"></span>
					<span className="dots"></span>
				</div>
				<div className="project-nav-buttons">
					<button>Cancel</button>
					<button>Next</button>
				</div>
				<input className='' type='submit' />
			</form>
		</div>
	);
}
