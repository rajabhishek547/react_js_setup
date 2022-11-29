export const ACTIONS = {
  CHANGE_PASSWORD: "change_password",
  STATUS: 'second-modal/status',
};

export const updateModal = (value: object) => ({ type: ACTIONS.STATUS, ...value });