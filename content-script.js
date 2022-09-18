console.log("version: 7");

// page size

let size_input = document.querySelector('#page_size');
size_input.value = "9999";

// sort tbody

const tbody_sel = '#container > div > div.table.colTable.v2.textCenter.mV2Table > table > tbody'
const tbody = document.querySelector(tbody_sel)

let enable_timout = true;
let sort_timeout = null;

tbody.addEventListener('DOMNodeInserted', function (event) {
	if (enable_timout && event.target.parentNode == tbody) {
		clearTimeout(sort_timeout)
		sort_timeout = setTimeout(sort_rows, 100)
	}
});

function sort_rows() {
	enable_timout = false;
	console.log('sort_rows')

	let trs = document.querySelectorAll('#container > div > div.table.colTable.v2.textCenter.mV2Table > table > tbody > tr')

	trs = Array.from(trs).sort((a, b) => {
		const num_a = parseInt(a.querySelector('td:nth-child(8)').textContent)
		const num_b = parseInt(b.querySelector('td:nth-child(8)').textContent)
		return num_b - num_a
	})
	tbody.replaceChildren(...trs)
	enable_timout = true;
}


