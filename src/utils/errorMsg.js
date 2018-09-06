const noJimpInstance = `Browser build for Jimp not found. Place this in your index.html file and restart the server - 
<script src="https://unpkg.com/jimp@0.3.9/browser/lib/jimp.min.js"></script>
`;

const webWorkerInfo =
  'For better performance, set disableWebWorker to false. This will keep your UI responsive as the image will be processed in a web worker.';

export { noJimpInstance, webWorkerInfo };
