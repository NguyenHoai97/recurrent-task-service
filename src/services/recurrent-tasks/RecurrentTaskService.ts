import { RecurrentTaskModel } from '@models/RecurrentTask';
import dbUtils from '@utils/db';

async function findAll({
  search,
  query,
  offset,
  limit,
  fields,
  sort,
  body
}): Promise<any> {
  const { documents: recurrentTasks, count } = await dbUtils.findAllTasks(
    RecurrentTaskModel,
    ['name', 'description', 'status'],
    {
      search,
      query,
      offset,
      limit,
      fields,
      sort,
      body
    }
  );
  return {
    recurrentTasks,
    count
  };
}

export { findAll };
export default findAll;
