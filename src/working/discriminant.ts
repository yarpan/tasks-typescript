
enum ActionType {
  CREATE_USER = "CREATE_USER",
  DELETE_USER = "DELETE_USER",
  UPDATE_USER = "UPDATE_USER",
  BLOCK_USER = "BLOCK_USER"
}

type CreateUserAction = {
  type: ActionType.CREATE_USER;
  payload: { name: string; age: number };
};

type DeleteUserAction = {
  type: ActionType.DELETE_USER;
  payload: { userId: number };
};

type UpdateUserAction = {
  type: ActionType.UPDATE_USER;
  payload: { userId: number; name?: string; age?: number };
};

type BlockUserAction = {
  type: ActionType.BLOCK_USER;
  payload: { userId: number; reason: string };
};

type Action =
  | CreateUserAction
  | DeleteUserAction
  | UpdateUserAction
  | BlockUserAction;


function performAction(action: Action): void {
  switch (action.type) {
    case ActionType.CREATE_USER:
      console.log(`Creating user: Name - ${action.payload.name}, Age - ${action.payload.age}`);
      break;

    case ActionType.UPDATE_USER:
      const updates = [];
      if (action.payload.name) updates.push(`Name - ${action.payload.name}`);
      if (action.payload.age) updates.push(`Age - ${action.payload.age}`);
      console.log(`Updating user with ID: ${action.payload.userId}. Updates: ${updates.join(", ")}`);
      break;

    case ActionType.DELETE_USER:
      console.log(`Deleting user with ID: ${action.payload.userId}`);
      break;

    case ActionType.BLOCK_USER:
      console.log(`Blocking user with ID: ${action.payload.userId}. Reason: ${action.payload.reason}`);
      break;

    default:
      const fullCheck: never = action;
      throw new Error(`unknown action type: ${fullCheck}`);
  }
}


performAction({
  type: ActionType.CREATE_USER,
  payload: { name: "Olesya", age: 33 },
});

performAction({
  type: ActionType.DELETE_USER,
  payload: { userId: 101 },
});

performAction({
  type: ActionType.UPDATE_USER,
  payload: { userId: 1, name: "Vasyl" },
});

performAction({
  type: ActionType.BLOCK_USER,
  payload: { userId: 1, reason: "Too many requests" },
});
