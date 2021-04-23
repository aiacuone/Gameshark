import React, { useState, useEffect } from 'react'
import '../styles/multiRange.css'

export default function MultiRange({
	min,
	max,
	multiplier,
	title,
	currency,
	percentage,
	minThumb,
	setMinThumb,
	maxThumb,
	setMaxThumb,
	createFilteredList,
	updateFetch,
	state,
	setState
}) {
	let [trackMouseDown, setTrackMouseDown] = useState(false)

	let arr = []
	for (let i = min; i < max + 1; i++) {
		arr.push(i)
	}

	let sections = arr.map((item) => {
		return (
			<div
				key={ new Date().getTime()+item}
				onClick={() =>
					Math.abs(minThumb - item) < Math.abs(maxThumb - item)
						? setMinThumb(item)
						: setMaxThumb(item)
				}
				className={'section-multi-range ' + item}
				onMouseEnter={() => {
					if (trackMouseDown) {
						if (Math.abs(minThumb - item) < Math.abs(maxThumb - item)) {
							setMinThumb(item)
						} else {
							setMaxThumb(item)
						}
					}
				}}
				style={{
					background:
						item < minThumb || item > maxThumb ? 'black' : 'rgb(92, 92, 92)',
				}}>
				{minThumb == item && (
					<div className="thumbContainer-multi-range min">
						<div className="thumb-multi-range min" />
					</div>
				)}
				{maxThumb == item && (
					<div className="thumbContainer-multi-range max">
						<div className="thumb-multi-range max" />
					</div>
				)}
			</div>
		)
	})

	useEffect(() => {
		document.body.addEventListener('mouseup', () => setTrackMouseDown(false))
		document.body.addEventListener('mouseleave', () => setTrackMouseDown(false))
		return () => {
			document.body.removeEventListener('mouseup', () =>
				setTrackMouseDown(false)
			)
			document.body.removeEventListener('mouseleave', () =>
				setTrackMouseDown(false)
			)
		}
	})

	return (
		<div className={"multi-range " +  title }>
			<div className={'header-container-multi-range ' +  title }>
				<div className="header-multi-range min">
					<p>
						{currency && currency}
						{multiplier ? minThumb * multiplier : minThumb}
						{percentage && '%'}
					</p>
				</div>
				<div className="header-multi-range title">
					<p>{title}</p>
				</div>
				<div className="header-multi-range max">
					<p>
						{maxThumb === max && title === 'Price' && '+'}
						{maxThumb === max && title === 'Reviews Amount' && '+'}
						{currency && currency}
						{multiplier ? maxThumb * multiplier : maxThumb}
						{percentage && '%'}
					</p>
				</div>
			</div>
			<div
				className="track-multi-range"
				onMouseUp={() => {
					setTrackMouseDown(false)
					// createFilteredList(state.apiState.data)
					updateFetch({sortBy:state.sortBy&&state.sortBy})
				}}
				onMouseLeave={() => {
					// trackMouseDown && createFilteredList(state.apiState.data)
					trackMouseDown && updateFetch({sortBy:state.sortBy&&state.sortBy})
					setTrackMouseDown(false)
				}}
				onMouseDown={() => setTrackMouseDown(true)}>
				{sections}
			</div>
		</div>
	)
}
