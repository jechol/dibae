console.log("version: 12")

// page size

let size_input = document.querySelector('#page_size')
size_input.value = "9999"

// sort rows

const edu_list_sel = '#container > div > div.edu_list'
const edu_list = document.querySelector(edu_list_sel)

let enable_timout = true;
let sort_timeout = null;

edu_list.addEventListener('DOMNodeInserted', function (event) {
	console.log("DOMNodeInserted")
	if (enable_timout && event.target.parentNode == edu_list) {
		clearTimeout(sort_timeout)
		sort_timeout = setTimeout(sort_rows, 100)
	}
});

function chunkArray(array, chunkSize) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

function parseIntFromStringMixed(inputString) {
  const numericPart = inputString.replace(/\D/g, ''); // Remove non-digit characters
  const parsedInt = parseInt(numericPart, 10); // Parse the numeric part as an integer
  return parsedInt;
}

function getNumberFromDivGroup(divs) {
		const text = divs[2].querySelector('div.date_num > p:nth-child(2) > span:nth-child(1)')
		const num = parseIntFromStringMixed(text.textContent)
		return num;
}



function sort_rows() {
	console.log("sort_rows")
	let nStart = new Date().getTime()

	enable_timout = false;
	let divs = [...edu_list.querySelectorAll('div')]
	console.log("insid sort divs.length", divs.length)
	let groups = chunkArray(divs, 3);

	let sorted_groups = Array.from(groups).sort((a, b) => {
		return getNumberFromDivGroup(b) - getNumberFromDivGroup(a)
	})
	let sorted_divs = [].concat(...sorted_groups)
	edu_list.replaceChildren(...sorted_divs)
	enable_timout = true;

	let nEnd = new Date().getTime()
	console.log(`sorted ${divs.length} rows in ${nEnd - nStart} ms`)
}

sort_rows()