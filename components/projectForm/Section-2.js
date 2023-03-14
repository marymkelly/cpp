import TagsInput from "./TagsInput";
import ToolsInput from "./ToolsInput";


export default function Section2(props) {
    return (
        <>
            <input type="text" placeholder="Your Role" name="role" value={props.project.role.title} onChange={props.handleInputChange}/>
			<input type="text" placeholder="client" value={props.project.client.name} onChange={props.handleInputChange}/>
			<TagsInput project={props.project} setProjectData={props.setProjectData}/>
			<ToolsInput project={props.project} setProjectData={props.setProjectData}/>
        </>
    )
}