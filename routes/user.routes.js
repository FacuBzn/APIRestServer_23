const {Router} = require('express');
const { userGet , userCreate, userUpdate, userDelete} = require('../controllers/user.controllers');

const router = Router();

router.get('/', userGet);

router.post('/', userCreate);

router.put('/:id', userUpdate);

router.delete('/:id', userDelete);

module.exports = router;











