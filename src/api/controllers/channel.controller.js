// import httpStatus from 'http-status';
// import ApiError from '../../../utils/ApiError';
// import acccRolesService from '../../services/accc/accc_roles.services';

import channelServices from '../services/channel.services.js';


async function createChannel(req, res) {
    const body = req.body;
    const id_channel = req.body.id_channel;
    try {
        // Buscar si hay el canal esta en la base de datos
        const getDataChannel = await channelServices.getChannel(id_channel);
        // Reasignar usuario
        const assingNewUser = await usersServices.assingUser();
        // Obtener usuario
        const getDataUser = await usersServices.getUser(); 
        // Obtener miembro
        const getDataMember = await memberServices.getMember();
        // Agregar usuario bot
        const addUserBot = await usersServices.createUserBot();
        // Crear canal
        const addChannel = await channelServices.createChannel(body);
        // Agregar reasignar historia
        const addAssingHistory = await assingHistoryServices.createAssingHistory();
        return res.json({ message: 'The data save with success', data: addChannel });
    } catch (error) {
        console.log(error);
    }
    
    // const { name } = req.body;
    // try {
    //   const nameExists = await acccRolesService.getRoleByName(name);
    //   if (nameExists != null) {
    //     return res
    //       .status(httpStatus.OK)
    //       .json({ message: 'The data already exists', data: nameExists });
    //   }
    //   const newRol = await acccRolesService.createChanel(req.body, req.user);
    //   return res
    //     .status(httpStatus.OK)
    //     .json({ message: 'Successfully created the role', data: newRol });
    // } catch (error) {
    //   throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    // }
}

/**
 * This method makes it possible to create ROl.
 *
 * @async
 * @function createRole
 * @param {Object} req - Is an object containing information about the HTTP request.
 * @param {Object} res - Is an object to return the desired HTTP response.
 * @returns {Promise<Object>} A record if it was successfully created.
 */
async function createRole(req, res) {
  const { name } = req.body;
  try {
    const nameExists = await acccRolesService.getRoleByName(name);
    if (nameExists != null) {
      return res
        .status(httpStatus.OK)
        .json({ message: 'The data already exists', data: nameExists });
    }
    const newRol = await acccRolesService.createRole(req.body, req.user);
    return res
      .status(httpStatus.OK)
      .json({ message: 'Successfully created the role', data: newRol });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

/**
 * This method makes it possible to delete ROl.
 *
 * @async
 * @function deleteRole
 * @param {Object} req - Is an object containing information about the HTTP request.
 * @param {Object} res - Is an object to return the desired HTTP response.
 * @returns {Promise<Object>} A id if it was successfully deleted.
 */
async function deleteRole(req, res) {
  try {
    const { idrole } = req.params;
    const role = await acccRolesService.deleteRole(idrole, req.user);
    if (role && res) {
      return res
        .status(httpStatus.OK)
        .json({ message: 'Successfully deleted the role', data: idrole });
    }
    throw new ApiError(httpStatus.NO_CONTENT, 'No content');
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

/**
 * This method makes it possible to update ROl.
 *
 * @async
 * @function updateRole
 * @param {Object} req - Is an object containing information about the HTTP request.
 * @param {Object} res - Is an object to return the desired HTTP response.
 * @returns {Promise<Object>} The record is returned with the modifications if
 *   it was updated successfully.
 */
async function updateRole(req, res) {
  try {
    const { idrole } = req.params;
    const { name } = req.body;
    const nameExists = await acccRolesService.getRoleByName(name);

    if (nameExists != null && nameExists.idrole !== idrole) {
      return res
        .status(httpStatus.OK)
        .json({ message: 'The data already exists', data: nameExists });
    }

    const dataUpdate = await acccRolesService.updateRole(
      idrole,
      req.body,
      req.user,
    );
    if (dataUpdate && res) {
      return res
        .status(httpStatus.OK)
        .json({ message: 'Successfully updated the role', data: dataUpdate });
    }
    throw new ApiError(httpStatus.NO_CONTENT, 'No content');
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

/**
 * This method makes it possible to get all ROl with ODATA and paginated.
 *
 * @async
 * @function getRoles
 * @param {Object} req - Is an object containing information about the HTTP request.
 * @param {Object} res - Is an object to return the desired HTTP response.
 * @returns {Promise<Object>} One or more role records
 */
async function getRoles(req, res) {
  try {
    const { idrole } = req.params;
    const roles = await acccRolesService.getRoles(idrole, req.query, req.user);
    if (!roles || roles.count <= 0) {
      throw new ApiError(httpStatus.NO_CONTENT, 'Non-existent record');
    }
    return res.status(httpStatus.OK).json({ message: 'List', data: roles });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}
async function getRolesFront(req, res) {
  try {
    const { idrole } = req.params;
    const roles = await acccRolesService.getRolesFront(
      idrole,
      req.query,
      req.user,
    );
    if (!roles || roles.count <= 0) {
      throw new ApiError(httpStatus.NO_CONTENT, 'Non-existent record');
    }
    return res.status(httpStatus.OK).json({ message: 'List', data: roles });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

export default {
  createChannel,
  createRole,
  deleteRole,
  updateRole,
  getRoles,
  getRolesFront,
};
