const noJimpInstance = `Browser build for Jimp not found. Place this in your index.html file and restart the server - 
<script src="https://cdn.rawgit.com/oliver-moran/jimp/v0.2.27/browser/lib/jimp.min.js"></script>
`;

const webWorkerInfo =
  'For better performance, set disableWebWorker to false. This will keep your UI responsive as the image will be processed in a web worker.';

export { noJimpInstance, webWorkerInfo };
