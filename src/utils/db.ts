async function findAllTasks(
  model,
  searchFields,
  { search, query, offset, limit, fields, sort, body }
): Promise<any> {
  try {
    search = body.query;
    const { creators, doers, departments, reviewers, status } = body;
    const s = searchFields
      .filter(
        field =>
          !(
            model.schema.paths[field].instance === 'Number' &&
            // eslint-disable-next-line no-restricted-globals
            isNaN(parseInt(search, 10))
          )
      )
      .map(field => {
        return model.schema.paths[field].instance === 'Number'
          ? {
              [field]: parseInt(search, 10)
            }
          : {
              [field]: new RegExp(search, 'gi')
            };
      });

    const count = await model.countDocuments({
      $and: [
        { $or: s },
        { 'creator.email': { $in: creators } },
        {
          $or: [
            { 'doer.email': { $in: doers } },
            { coDoers: { $elemMatch: { email: { $in: doers } } } }
          ]
        },
        {
          $or: [
            {
              'department.name': {
                $in: departments.map(department => department.trim())
              }
            },
            {
              coDepartments: {
                $elemMatch: {
                  name: {
                    $in: departments.map(department => department.trim())
                  }
                }
              }
            }
          ]
        },
        { 'reviewer.email': { $in: reviewers } },
        { status: { $in: status } }
      ]
    });

    const documents = await model
      .find({
        $and: [
          { $or: s },
          { 'creator.email': { $in: creators } },
          {
            $or: [
              { 'doer.email': { $in: doers } },
              { coDoers: { $elemMatch: { email: { $in: doers } } } }
            ]
          },
          {
            $or: [
              {
                'department.name': {
                  $in: departments.map(department => department.trim())
                }
              },
              {
                coDepartments: {
                  $elemMatch: {
                    name: {
                      $in: departments.map(department => department.trim())
                    }
                  }
                }
              }
            ]
          },
          { 'reviewer.email': { $in: reviewers } },
          { status: { $in: status } }
        ]
      })
      .skip(offset || 0)
      .limit(limit || 40)
      .sort(
        sort
          ? JSON.parse(
              `{${sort
                .map(element => {
                  const field = element.substring(0, element.lastIndexOf('_'));
                  const value =
                    element.substring(element.lastIndexOf('_') + 1) === 'asc'
                      ? 1
                      : -1;
                  return `"${field}":${value}`;
                })
                .join(',')}}`
            )
          : {
              _id: 1
            }
      )
      .select(
        fields
          ? JSON.parse(`{${fields.map(element => `"${element}":1`).join(',')}}`)
          : {}
      )
      .lean();

    return {
      documents,
      count
    };
  } catch (error) {
    return {
      error
    };
  }
}

export default { findAllTasks };
