export const ACTIONS = {
  CHANGE_PASSWORD: "change_password",
  STATUS: 'snackBar/status',
};

export default function snackBarUpdate(value: object) {
  return (dispatch: Function) => {
    dispatch({ type: ACTIONS.STATUS, ...value });
  };
}