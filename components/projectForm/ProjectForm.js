import { useState } from "react";
import Section1 from "./Section-1";
import Section2 from "./Section-2";
import Xmark from "../assets/icons/Plus";

export default function ProjectForm(props) {
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

	const resetProject = () => {
		setProjectData({
			ownerId: "",
			name: "",
			description: "",
			category: "",
			status: "",
			dates: { startDate: "", endDate: "" },
			type: "",
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
	}


	const [slideIndex, setSlideIndex] = useState(0);
	const [error, setError] = useState(false);

	const handlePrevSlide = () => {
		setSlideIndex((prev) => (prev === 0 ? 1 : prev - 1))
	}

	const handleNextSlide = () => {
		if (project.name === "") {
			setError(1);
		} else {
			setSlideIndex((next) => (next === 1 ? 0 : next + 1));
			setError(false)
		}
	}


	//Submit data to project data
	const handleSubmit = (e) => {
		e.preventDefault();
		resetProject()
		setSlideIndex(0)
		props.setFormActive(false)
		console.log("Form submitted:", project);
	};

	//handing the input change
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
		} else if (name === "role") {
			setProjectData({
				...project,
				role: {
					...project.role,
					title: value
				},
			})
		} else {
			setProjectData({
				...project,
				[name]: value,
			});
		}
	};


	return (
		<main className={`project-form-container ${props.formActive === true ? "active" : ""}`}>
			<div className={`create-project-form ${props.formActive === true ? "active" : ""}`}>
				<div className="form-head-container">
					<h1 className='primary-navy'>New Project</h1>
					<button onClick={() => {
						resetProject()
						setSlideIndex(0)
						props.toggleForm()
					}} >
						<Xmark className="primary-navy delete-button" />
					</button>
				</div>
				{error && (
					<div className="error">You must give your project a name</div>
				)}
				<form onSubmit={handleSubmit}>
					<div className="slide-container">
						<div className={`slide ${slideIndex === 0 ? "active" : ""}`}>
							<Section1 handleInputChange={handleInputChange} project={project} setProjectData={setProjectData} />
						</div>
						<div className={`slide ${slideIndex === 1 ? "active" : ""}`}>
							<Section2 handleInputChange={handleInputChange} project={project} setProjectData={setProjectData} />
						</div>
					</div>
				</form >
				<div className="section-indicator">
					<span className={`dots ${slideIndex === 0 ? "active" : ""}`}></span>
					<span className={`dots ${slideIndex === 1 ? "active" : ""}`}></span>
				</div>
				<div className="project-nav-buttons">
					{slideIndex === 0 ? (
						<>
							<button onClick={() => {
								resetProject()
								setSlideIndex(0)
								props.toggleForm()
							}}>Cancel</button>
							<button onClick={handleNextSlide}>Next</button>
						</>
					) : (
						<>
							<button onClick={handlePrevSlide}>Back</button>
							<button onClick={handleSubmit}>Save</button>
						</>
					)}
				</div>
			</div >
		</main>
	);
}
