import './side-bar.css';
import { useRef } from 'react';

const SideBar = ({children, onClick})=>{

	const viewRef = useRef(null);
	const addRef = useRef(null);

	const onTileClick = (event)=> {
		// console.log(event);
		if(event.target.innerText === 'View Tasks'){
			onClick('view-task');
			viewRef.current.style.backgroundColor = "#6bfad4";
			addRef.current.style.backgroundColor = "white";
		}
			
		else if(event.target.innerText === 'Add Tasks'){
			onClick('add-task')
			viewRef.current.style.backgroundColor = "white";
			addRef.current.style.backgroundColor = "#6bfad4";
		}
	}

	return (
		<>
			<div className='d-flex gap-3 full-height'>
				<div className='side-bar d-flex flex-column'>
					<div className='title'>
						<h3 className='text-center'>To-do</h3>
					</div>
					<button ref={viewRef} className='d-flex align-items-center justify-content-center flex-grow-1 tile' onClick={onTileClick} style={{backgroundColor: '#6bfad4'}}>
						View Tasks
					</button>
					<button ref={addRef} className='d-flex align-items-center justify-content-center flex-grow-1 tile' onClick={onTileClick}>
						Add Tasks
					</button>
				</div>
				<div className='flex-grow-1'>
					{children}
				</div>
			</div>
		</>
		);
}

export default SideBar;