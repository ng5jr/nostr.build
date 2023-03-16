//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
	dragText = dropArea.querySelector(".drag-area_title"),
	dragHeader = dropArea.querySelector(".drag-area_header"),
	dragSharing = dropArea.querySelector(".drag-area_sharing"),
	dragImport = dropArea.querySelector(".import"),
	metadata = document.querySelector(".metadata_container"),
	loadingBar = document.querySelector(".loading_state"),
	loadingInfo = document.querySelector(".loading_info span"),
	loadingArea = document.querySelector(".drag-area_loading"),
	toast = document.querySelector(".toast"),
	button = dropArea.querySelector(".upload_button"),
	terms = document.querySelector(".terms");
input = dropArea.querySelector(".hidden_input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
	input.click(); //if user click on the button then the input also clicked
};

input.addEventListener("change", function () {
	//getting user select file and [0] this means if user select multiple files then we'll select only the first one
	file = this.files[0];

	showFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
	event.preventDefault(); //preventing from default behaviour
	dropArea.classList.add("active");
	dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
	dropArea.classList.remove("active");
	dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
	event.preventDefault(); //preventing from default behaviour
	//getting user select file and [0] this means if user select multiple files then we'll select only the first one
	file = event.dataTransfer.files[0];
	console.log(file);
	showFile(); //calling function
});

function loadVideo(file) {
	console.log(file);
	const reader = new FileReader();

	reader.onload = () => {
		const videoPlayer = document.getElementById("video-player");
		videoPlayer.src = reader.result;
		videoPlayer.play();
	};

	reader.readAsDataURL(file);
}

function showFile() {
	let fileType = file.type; //getting selected file type

	let validExtensions = ["image/jpeg", "image/jpg", "image/png", "video/*", "video/mkv", "video/x-m4v", "video/mp4"]; //adding some valid image extensions in array
	if (validExtensions.includes(fileType)) {
		//if user selected file is an image file
		let fileReader = new FileReader(); //creating new FileReader object

		if (fileType.includes("image")) {
			fileReader.onload = () => {
				let fileURL = fileReader.result; //passing user file source in fileURL variable
				dropArea.querySelector(".uploaded_img").src = fileURL;
			};
		} else if (fileType.includes("video")) {
			fileReader.onload = () => {
				const videoPlayer = document.getElementById("video-player");
				videoPlayer.src = fileReader.result;
				videoPlayer.play();
			};
		}

		fileReader.addEventListener("loadstart", function () {
			loadingBar.style.width = "0%";
			loadingInfo.innerHTML = "0";
			loadingArea.classList.remove("hidden_element");
		});
		fileReader.addEventListener("progress", function (e) {
			if (e.lengthComputable) {
				const percentLoaded = (e.loaded / e.total) * 100;
				loadingBar.style.width = `${percentLoaded}%`;
				loadingInfo.innerHTML = Math.floor(percentLoaded);
			}
		});

		fileReader.addEventListener("loadend", function () {
			loadingArea.classList.add("hidden_element");
			dragSharing.classList.remove("hidden_element");
			if (fileType.includes("video")) {
				dropArea.querySelector(".uploaded_video").classList.remove("hidden_element");
				document.querySelector(".sharing_info span").textContent = "video";
				document.querySelector(".image_address").textContent = "Copy Video Address";
				document.querySelector(".toast_info span").textContent = "video";
			}
		});

		fileReader.readAsDataURL(file);
		dragHeader.classList.add("hidden_element");
		terms.classList.add("hidden_element");
		dragImport.classList.add("hidden_element");
		metadata.classList.remove("hidden_element");
	} else {
		alert("This is not an Image File!");
		dropArea.classList.remove("active");
		dragText.textContent = "Drag & Drop to Upload File";
	}
}

function showToast() {
	toast.classList.remove("hidden_element");
	setTimeout(() => {
		toast.classList.add("hidden_element");
	}, 1500);
}

let copyAddress = document.querySelector(".image_address");

copyAddress.addEventListener("click", () => {
	showToast();
});

const inputVideo = document.getElementById("video-input");
