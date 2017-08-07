const express=require('express');
const userRoutes=express.Router();
const usersController=require('../controllers/users-controller');
const authHelpers=require('../services/auth/auth-helpers');

userRoutes.get('/',authHelpers.loginRequired,usersController.index);
userRoutes.get('/fight',usersController.list);
userRoutes.get('/fight/:id',usersController.show);
userRoutes.get('/start/:id',usersController.pick);
userRoutes.get('/edit',authHelpers.loginRequired,usersController.edit);
userRoutes.put('/',authHelpers.loginRequired,usersController.update);

module.exports=userRoutes;