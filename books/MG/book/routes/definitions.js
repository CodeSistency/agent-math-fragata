const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:folder/:file', (req, res) => {
  const { folder, file, extend } = req.params;
  res.sendFile(
    path.join(__dirname, `../definitions/${folder.slice(1)}/${file.slice(1)}.${extend}`)
  );
});

module.exports = router;
