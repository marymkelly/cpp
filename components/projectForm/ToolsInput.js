import { useState } from "react";
import ArrowLeft from "../assets/icons/ArrowLeft";
import Xmark from "../assets/icons/ArrowLeft"

export default function ToolsInput(props) {

    const [toolInput, setToolInput] = useState("");

	const handleToolsInput = (e) => {
		setToolInput(e.target.value);
	}

	const handleAddTools = () => {
		props.setProjectData({ ...props.project, tools: [...props.project.tools, toolInput] })
		setToolInput("")
	}

	const handleRemoveTools = (index) => {
		setProjectData({
			...props.project,
			tools: props.project.tools.filter((tools, i) => i !== index)
		})
	}

    return (
        <div className="tag-section">
					<input type="text" name="tools" value={toolInput} onChange={handleToolsInput} onKeyDown={ e => e.key === 'Enter' ? handleAddTools() : null } placeholder="Add Tools / Technology" />
					<button className="tag-arrow" onClick={handleAddTools}><ArrowLeft className="logo-green" /></button>
					<div className="tag-container">
						{props.project.tools.map((tools, index) => (
							<div key={`tools-${index}`} className="tag-content">
								<div className="tools">
									{tools}
								</div>
								<button onClick={() => handleRemoveTools(index)}>
									<Xmark className="primary-navy delete-button" />
								</button>
							</div>
						))}
					</div>
				</div>
    )
}