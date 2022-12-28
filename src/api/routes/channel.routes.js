import { Router } from 'express';
// import asyncHandler from 'express-async-handler';
// import validate from '../../../middlewares/validate';
// import roleValid from '../../validations/accc/accc_roles.validation';
// import acccRoleCtrl from '../../controllers/accc/accc_roles.controller';
// import auth from '../../../middlewares/auth';

import channelController from '../controllers/channel.controller.js';

const router = Router();

router.post(
   '/createChannel',
   channelController.createChannel
);

// router.get(
//   '/',
//   auth('accc_roles_getRoles'),
//   validate(roleValid.getRoles),
//   asyncHandler(acccRoleCtrl.getRoles),
// );
// router.get(
//   '/front',
//   auth('accc_roles_getRoles'),
//   validate(roleValid.getRoles),
//   asyncHandler(acccRoleCtrl.getRolesFront),
// );
// router.get(
//   '/:idrole',
//   auth('accc_roles_getRoles'),
//   validate(roleValid.getRol),
//   asyncHandler(acccRoleCtrl.getRoles),
// );

// router.post(
//   '/',
//   auth('accc_roles_createRole'),
//   validate(roleValid.createRole),
//   asyncHandler(acccRoleCtrl.createRole),
// );

// router.patch(
//   '/:idrole',
//   auth('accc_roles_updateRole'),
//   validate(roleValid.updateRole),
//   asyncHandler(acccRoleCtrl.updateRole),
// );

// router.delete(
//   '/:idrole',
//   auth('accc_roles_deleteRole'),
//   validate(roleValid.deleteRole),
//   asyncHandler(acccRoleCtrl.deleteRole),
// );

export default router;
