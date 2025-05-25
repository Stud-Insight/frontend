<script>
	import { degrees, PDFDocument, rgb, values } from 'pdf-lib';
	import * as pdfjsLib from 'pdfjs-dist';

	pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.mjs';

	const pdfUrl = './src/routes/pdf/';
	const imgUrl = './src/routes/pdf/signature.png';
	let currentPage = 1;
	let fileName = '';
	let canvasElement;
	let pdfDoc = null;
	let isAnnotating = false;
	let numPages;
    let modifiedPdfURL = '';
	let canvas = null;
	let coordX=null, coordY = null;

	// lit le pdf
	async function loadPdf(url) {
		currentPage = Number(document.getElementById('pageNumber').value);
		pdfDoc = await pdfjsLib.getDocument(url).promise;
		numPages = pdfDoc.numPages;
		console.log('currentPage : ', currentPage);
		renderPage(currentPage);
		console.log('rendered');
	}

	// affiche la page actuelle du pdf dans la balise canvas
	async function renderPage(pageNumber) {
		console.log('pageNumber : ', pageNumber);
		const page = await pdfDoc.getPage(pageNumber);
		console.log('page : ', page);
		const scale = 1;
		const viewport = page.getViewport({ scale });

		canvas = canvasElement;
		const context = canvas.getContext('2d');

		canvas.height = viewport.height;
		console.log("canvas.height : ", canvas.height);
		canvas.width = viewport.width;

		console.log(viewport.width, "+", viewport.height);

		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		page.render(renderContext);
		console.log('rendered 2');
	}

	// function savePdf() {
	// 	console.log('save pdf !');
	// }

	// async function savePdf() {
    //     console.log("fuction savePdf called");
	// 	const existingPdfBytes = await fetch(pdfUrl+fileName).then((res) => res.arrayBuffer());
	// 	const pngImgBytes = await fetch(imgUrl).then((res) => res.arrayBuffer());


    //     console.log("await 1");

	// 	const pdfDoc = await PDFDocument.load(existingPdfBytes);
	// 	const pngImg = await pdfDoc.embedPng(pngImgBytes);
	// 	const pngImgScale = pngImg.scale(0.5);
	// 	const pages = pdfDoc.getPages();

	// 	console.log("pages : ", pages);

	// 	const modifiedPage = pages[currentPage-1];

	// 	console.log("modifiedPage : ", modifiedPage);

	// 	const {width, height} = modifiedPage.getSize();
		
	// 	console.log("wid, hei : ", width, ", ", height);

	// 	// modifiedPage.drawText('Annotation ajoutée avec pdf-lib', {
	// 	// 	x: coordX,
	// 	// 	y: coordY,
	// 	// 	size: 30,
	// 	// 	color: rgb(1, 0, 0)
	// 	// });

	// 	// modifiedPage.drawImage(pngImg, {
	// 	// 	x: coordX,
	// 	// 	y: coordY,
	// 	// 	width: pngImgScale.width,
	// 	// 	height: pngImgScale.height
	// 	// });

	// 	const modifiedPdfBytes = await pdfDoc.save();
	// 	download(modifiedPdfBytes, 'example-modified.pdf', 'application/pdf');

    //     console.log("pdf saved");
	// }

	async function modifyPdf() {
        console.log("fuction modifyPdf called");
		const existingPdfBytes = await fetch(pdfUrl+fileName).then((res) => res.arrayBuffer());

        console.log("await modif 1");

		const pdfDocModified = await PDFDocument.load(existingPdfBytes);
		const pages = pdfDocModified.getPages();
		const pageModif = pages[currentPage-1];
		console.log("currentPage : ", currentPage);

		pageModif.drawText('Annotation ajoutée avec pdf-lib', {
			x: coordX,
			y: coordY,
			size: 30,
			color: rgb(1, 0, 0)
		});

		const modifiedPdfBytes = await pdfDocModified.save();
		console.log("modifiedPdfBytes : ", modifiedPdfBytes);

		const modifiedBlob = new Blob([modifiedPdfBytes], {type : "application/pdf"});

		const modifiedUrl = URL.createObjectURL(modifiedBlob);
		pdfDoc = await pdfjsLib.getDocument(modifiedUrl).promise;
		console.log("modifiedUrl : ", modifiedUrl);
		console.log("pdfDoc : ", pdfDoc);
		renderPage(currentPage);
	}
	
	function selectFile(fName){
		fileName = fName;
		document.getElementById('pageNumber').value = 1;
		loadPdf(pdfUrl+fileName);
	}

	function annotate(){
		isAnnotating = !isAnnotating;
	}

	function changePage() {
		currentPage = Number(document.getElementById('pageNumber').value);
		renderPage(currentPage);
	}

	// récupère les coordonnées de clic
	function clicCanvas(e){
		if(isAnnotating){
			coordX = e.offsetX;
			coordY = canvas.height - e.offsetY;

			// let input = document.createElement('input');
			// input.type = 'text';
			// input.style.position = 'fixed';
			// input.style.left = coordX + 'px';
			// input.style.top = e.offsetY + 'px';

			// document.body.appendChild(input);

			// input.focus(); // place le focus sur l'élément input

			console.log("X : ", e.offsetX);
			console.log("Y : ", canvas.height - e.offsetY);
			console.log("canvas.width : ", canvas.width);
			console.log("canvas.height-clic : ", canvas.height);
		}
	}

	function hello(){
		console.log("hello");
	}

</script>

<div id="toolbar">
	<input type="file" id="fileInput" accept=".pdf" onchange="{(e) =>selectFile(e.target.files[0].name)}">
	<button onclick={annotate}>
		{isAnnotating ? "Désactiver l'annotation" : "Activer l'annotation"}
	</button>
	<input type="number" id="pageNumber" min="1" max={numPages} value="1" onclick="{changePage}"/>
	<button onclick={modifyPdf}>Modifier</button>
	<button onclick={hello}>Enregistrer le PDF modifié</button>
	Coord cliqué : {coordX}, {coordY}
</div>

<canvas bind:this={canvasElement} onclick="{clicCanvas}"></canvas>