import { useState } from "react";
import Section1 from "./Section-1";
import Section2 from "./Section-2";

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
	const [slideIndex, setSlideIndex] = useState(0);

	const handlePrevSlide = () => {
		setSlideIndex((prev) => (prev === 0 ? 1 : prev - 1))
	}

	const handleNextSlide = () => {
		setSlideIndex((next) => (next === 1 ? 0 : next + 1))
	}
	

	//Submit data to project data
	const handleSubmit = (e) => {
		e.preventDefault();
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
		<div className='create-project-form'>
			<h1 className='primary-navy'>New Project</h1>
			<form onSubmit={handleSubmit}>
				
				{slideIndex === 0 ? (
					 <Section1 handleInputChange={handleInputChange} project={project} setProjectData={setProjectData} />
				) : (
					<Section2 handleInputChange={handleInputChange} project={project} setProjectData={setProjectData} />
				)
				}
			</form >
			<div className="section-indicator">
				<span className={`dots ${slideIndex === 0 ? "active" : ""}`}></span>
				<span className={`dots ${slideIndex === 1 ? "active" : ""}`}></span>
			</div>
			<div className="project-nav-buttons">
				<button onClick={handlePrevSlide}>Back</button>
				<button onClick={handleNextSlide}>Next</button>
			</div>
		</div >
	);
}
