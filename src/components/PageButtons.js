import React from 'react'
import arrow from '../images/left_arrow.svg'

export default function PageButtons({ state, setState, updateFetch }) {
	let arr = []
	for (let i = state.page - 4; i <= state.page + 4; i++) {
		arr.push(i)
	}

	let pageButtons = arr.map((item, index) => {
		if (index < 4 && item > 0)
			return (
				<p
					class="previous_next_buttons"
					onClick={() => {
						setState.setPage(item)
						updateFetch({ page: item, sortBy: state.sortBy && state.sortBy })
					}}>
					{item}
				</p>
			)
		if (index == 4) return <h3 class="current_page">{item}</h3>
		if (index > 3 && item > 0)
			return (
				<p
					class="previous_next_buttons"
					onClick={() => {
						setState.setPage(item)
						updateFetch({ page: item, sortBy: state.sortBy && state.sortBy })
					}}>
					{item}
				</p>
			)
	})

	let skipPage
	for (let j = state.page; j < state.page + 15; j++) {
		if (j % 10 == 0) skipPage = j
	}

	return (
		<div class="page_buttons_container">
			<div class="page_buttons_header">
				{state.page !== 1 && <h4 class="previous_page">Previous</h4>}
				<h4 class="page_header">Page</h4>
				<h4 class="next_page">Next</h4>
			</div>
			<div class="page_buttons">
				{state.page !== 1 && (
					<img
						class="arrow left"
						src={arrow}
						onClick={() => {
							setState.setPage(state.page - 1)
							updateFetch({
								page: state.page - 1,
								sortBy: state.sortBy && state.sortBy,
							})
						}}
					/>
				)}
				{state.page > 5 && (
					<p
						class="previous_next_buttons"
						onClick={() => {
							setState.setPage(1)
							updateFetch({ page: 1, sortBy: state.sortBy && state.sortBy })
						}}>
						1
					</p>
				)}
				{pageButtons}
				{
					<p
						class="previous_next_buttons"
						onClick={() => {
							setState.setPage(skipPage)
							updateFetch({
								page: skipPage,
								sortBy: state.sortBy && state.sortBy,
							})
						}}>
						{skipPage}
					</p>
				}
				{
					<img
						class="arrow right"
						src={arrow}
						onClick={() => {
							setState.setPage(state.page + 1)
							updateFetch({
								page: state.page + 1,
								sortBy: state.sortBy && state.sortBy,
							})
						}}
					/>
				}
			</div>
			{/* { console.log(state.page)} */}
		</div>
	)
}
