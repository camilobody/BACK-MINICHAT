// import { Op, literal } from 'sequelize';
// import conn, { models } from '../../../db';
// import parserSeqQuery from '../../../utils/parserseqquery';
// import { getPagingData } from '../../../utils/paginate';
// import { response } from 'express';

// const { accc_roles: acccRoles } = models;

import channelModels from '../../db/models/channel.models.js';

async function createChannel() {
    const response = channelModels.save([
        {id_user: "Michel"},
        {id_user: "John"},
        {id_user: "Jessie"}
    ]).then(function(result) {
        // Michel, John and Jessie are saved
        console.log(result);
        return result;
    }).error(function(error) {
        // Handle error
        console.log(error);
        return error;
    });
    return response;
    // if (idrole) {
    //   const record = await acccRoles.findOne({
    //     where: { idrole },
    //   });
    //   return record;
    // }
    // const queryWhere = await parserSeqQuery(query, conn);
    // if (
    //   currUser?.roles?.length > 0 &&
    //   !currUser?.commerces?.includes(1) &&
    //   !currUser?.associates?.includes(1)
    // ) {
    //   queryWhere.where = {
    //     ...queryWhere.where,
    //     idrole: currUser.roles,
    //   };
    // }
    // let records = await acccRoles.findAndCountAll({
    //   ...queryWhere,
    //   raw: true,
    // });
    // records = getPagingData(records, queryWhere.offset, queryWhere.limit);
    // return records;
}

/**
 * @param {any} idrole
 * @returns
 */
async function getRoles(idrole, query, currUser) {
  if (idrole) {
    const record = await acccRoles.findOne({
      where: { idrole },
    });
    return record;
  }
  const queryWhere = await parserSeqQuery(query, conn);
  if (
    currUser?.roles?.length > 0 &&
    !currUser?.commerces?.includes(1) &&
    !currUser?.associates?.includes(1)
  ) {
    queryWhere.where = {
      ...queryWhere.where,
      idrole: currUser.roles,
    };
  }
  let records = await acccRoles.findAndCountAll({
    ...queryWhere,
    raw: true,
  });
  records = getPagingData(records, queryWhere.offset, queryWhere.limit);
  return records;
}
async function getRolesFront(idrole, query, currUser) {
  if (idrole) {
    const record = await acccRoles.findOne({
      where: { idrole },
    });
    return record;
  }
  // GET ADDITIONAL QUERY
  const additionalQuery = query?.additionalQuery;
  delete query?.additionalQuery; // REMOVE ADDITIONAL QUERY FROM OBJECT QUERY
  const queryWhere = await parserSeqQuery(query, conn);
  if (
    currUser?.roles?.length > 0 &&
    !currUser?.commerces?.includes(1) &&
    !currUser?.associates?.includes(1)
  ) {
    queryWhere.where = {
      ...queryWhere.where,
      idrole: currUser.roles,
    };
  }
  if (
    additionalQuery !== undefined &&
    additionalQuery !== 'undefined' &&
    additionalQuery
  ) {
    queryWhere.where = [
      { ...queryWhere.where },
      {
        [Op.and]: [literal(additionalQuery)],
      },
    ];
  }
  let records = await acccRoles.findAndCountAll({
    ...queryWhere,
    raw: true,
  });
  records = getPagingData(records, queryWhere.offset, queryWhere.limit);
  return records;
}
/**
 * @param {any} name
 * @returns
 */
async function getRoleByName(name) {
  const nameExists = await acccRoles.findOne({
    where: {
      name,
    },
  });
  return nameExists;
}

/**
 * @param {any} data
 * @param {any} currUser
 * @returns
 */
async function createRole(data, currUser) {
  const { name, description, ismaster } = data;
  const result = await acccRoles.create(
    {
      name,
      description,
      ismaster,
    },
    { currUser },
  );
  return result;
}

/**
 * @param {any} idrole
 * @param {any} data
 * @param {any} currUser
 * @returns
 */
async function updateRole(idrole, data, currUser) {
  const { name, description, ismaster } = data;
  const result = await acccRoles.update(
    { name, description, ismaster },
    { where: { idrole }, returning: true, currUser },
  );
  return result?.length > 1 && result[1].length === 1
    ? result[1][0]
    : result[1] || result;
}

/**
 * @param {any} idrole
 * @param {any} currUser
 * @returns
 */
async function deleteRole(idrole, currUser) {
  const role = await acccRoles.destroy({ where: { idrole }, currUser });
  return role;
}

export default {
  createChannel,
  getRoles,
  getRolesFront,
  getRoleByName,
  createRole,
  updateRole,
  deleteRole,
};
