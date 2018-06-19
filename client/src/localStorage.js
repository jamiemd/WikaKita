export const loadState = () => {
  console.log("loadstate called");
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};

export const saveState = state => {
  console.log("savestate called");
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log("err", err);
    // Ignore write errors.
  }
};
