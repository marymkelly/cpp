import { useState } from "react";
import ArrowLeft from "../assets/icons/ArrowLeft";
import Xmark from "../assets/icons/Plus";

export default function TagsInput(props) {
	const [tagInput, setTagInput] = useState("");

	const handleTagInput = (e) => {
		setTagInput(e.target.value);
	};

	const handleAddTag = () => {
		if (tagInput) {
			props.setProjectData({ ...props.project, tags: [...props.project.tags, tagInput] });
			setTagInput("");
		}
	};

	const handleRemoveTag = (index) => {
		props.setProjectData({
			...props.project,
			tags: props.project.tags.filter((tags, i) => i !== index),
		});
	};

	return (
		<div className='tag-section'>
			<input type='text' name='tags' value={tagInput} onChange={handleTagInput} placeholder='Add Tags' />
			<button className='tag-arrow' onClick={handleAddTag}>
				<ArrowLeft className='logo-green' />
			</button>
			<div className='tag-container'>
				{props.project.tags.map((tags, index) => (
					<div key={`tags-${index}`} className='tag-content'>
						<div className='tools'>{tags}</div>
						<button onClick={() => handleRemoveTag(index)}>
							<Xmark className='primary-navy delete-button' />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
