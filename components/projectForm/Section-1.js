
export default function Section1(props) {


    return (
        <>
			<input name='name' placeholder='Project Name *' type='text' value={props.project.name} onChange={props.handleInputChange} />
			<input name='description' placeholder='Description' type='text' value={props.project.description} onChange={props.handleInputChange} />
			<select name='category' value={props.project.category} onChange={props.handleInputChange}>
				<option value='' disabled={true}>
					Catagory
				</option>props.
				<option value='work'>work</option>
				<option value='personal'>personal</option>
				<option value='school'>school</option>
			</select>
			<label className='logo-green'>
				Start Date
				<input id='startDate' type='date' name='startDate' value={props.project.dates.startDate} onChange={props.handleInputChange} />
			</label>
			<label className='logo-green'>
				End Date
				<input type='date' name='endDate' value={props.project.dates.endDate} onChange={props.handleInputChange} />
			</label>
			<select name='status' value={props.project.status} onChange={props.handleInputChange}>
				<option disabled={true} value=''>
					Status
				</option>
				<option value='active'>Active</option>
				<option value='pending'>Pending</option>
				<option value='upcoming'>upcoming</option>
				<option value='overdue'>Overdue</option>
				<option value='suspended'>Suspended</option>
			</select>
		</>
    )
}