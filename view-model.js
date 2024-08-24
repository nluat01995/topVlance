const { createConnection } = require('typeorm');
const { ModelViewer } = require('typeorm-model-viewer');

createConnection().then((connection) => {
  const modelViewer = new ModelViewer(connection.getMetadata());
  modelViewer.generate(); // Tạo sơ đồ mô hình
});
