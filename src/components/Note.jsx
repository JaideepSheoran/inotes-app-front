import React, { useState } from 'react';
import './Note.css';

const Note = ({note}) => {

	const fontSizes = [10, 12, 14, 16, 18, 20];
	const [size, setSize] = useState(fontSizes[1]);
    
	return (
		<div className='note'>
			<h3>{note.title}</h3>
			{
				Object.values(note.tags).map((tag) => {
					return (
						<span>#{tag}</span>
					)
				})
			}
			<hr />
			{
				fontSizes.map((fontSize) => {
					return (
						<span onClick={(e) => {e.preventDefault(); setSize(fontSize);}}>{fontSize}px</span>
					)
				})
			}
			<pre style={{fontSize : `${size}px`}}>{note.note}</pre>
		</div>
  	)
}

export default Note