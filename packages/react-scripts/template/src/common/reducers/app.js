const reducers = {
  INCREMENT_COUNTER: ({ count = 0, ...app }) => ({ ...app, count: count + 1 }),
};

export default (state = {}, action) =>
  reducers && reducers[action.type] ? reducers[action.type](state, action) : state;
