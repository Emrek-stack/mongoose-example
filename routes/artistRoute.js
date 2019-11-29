var express = require('express');
var router = express.Router();
var artistController = require('../controllers/artistController');

/*
 * GET
 */
router.get('/list', artistController.list);
router.get('/collect', artistController.collect);

/*
 * GET
 */
router.get('/detail/:id', artistController.show);
router.get('/edit/:id', artistController.editView);
router.get('/create', artistController.createView);
/*
 * POST
 */

router.post('/create', artistController.create);

/*
 * PUT
 */
router.post('/edit/:id', artistController.update);

/*
 * DELETE
 */
router.delete('/:id', artistController.remove);

module.exports = router;
