import { RecurrentTaskModel } from '@models/RecurrentTask';
import dbUtils from '@utils/db';

async function findAll({
  search,
  query,
  offset,
  limit,
  fields,
  sort
}): Promise<any> {
  console.log('search', search);
  const { documents: recurrentTasks, count } = await dbUtils.findAll(
    RecurrentTaskModel,
    ['name'],
    {
      search,
      query,
      offset,
      limit,
      fields,
      sort
    }
  );
  console.log('task', recurrentTasks);
  return {
    recurrentTasks,
    count
  };
}

export { findAll };
export default findAll;
