const noJimpInstance = `Browser build for Jimp not found. Place this in your index.html file and restart the server - 
<script src="https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js"></script>
`;

// const imageError = `'No support for web worker and found no browser build for Jimp. Place this in - 
// your index.html file - <script src="https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js"></script>`;

// const workerInfo =
// 	'Web worker not supported so the image will be processed in main thread. This may affect the performance and block the UI.';

const webWorkerInfo =
	'For better performance, set disableWebWorker to false. This will keep your UI responsive as the image will be processed in a web worker.';

export { noJimpInstance, webWorkerInfo };
