type CreateUserAction = {
  type: "CREATE_USER";
  payload: { name: string; age: number };
};

type DeleteUserAction = {
  type: "DELETE_USER";
  payload: { userId: number };
};

type UpdateUserAction = {
  type: "UPDATE_USER";
  payload: { userId: number; name?: string; age?: number };
};

type BlockUserAction = {
  type: "BLOCK_USER";
  payload: { userId: number; reason: string };
};

type Action =
  | CreateUserAction
  | DeleteUserAction
  | UpdateUserAction
  | BlockUserAction;

function performAction(action: Action): void {
  switch (action.type) {
    case "CREATE_USER":
      console.log(`Creating user: Name - ${action.payload.name}, Age - ${action.payload.age}`);
      break;

    case "UPDATE_USER":
      const updates = [];
      if (action.payload.name) updates.push(`Name - ${action.payload.name}`);
      if (action.payload.age) updates.push(`Age - ${action.payload.age}`);
      console.log(`Updating user with ID: ${action.payload.userId}. Updates: ${updates.join(", ")}`);
      break;

    case "DELETE_USER":
      console.log(`Deleting user with ID: ${action.payload.userId}`);
      break;

    case "BLOCK_USER":
      console.log(`Blocking user with ID: ${action.payload.userId}. Reason: ${action.payload.reason}`);
      break;

    default:
      const fullCheck: never = action;
      throw new Error(`unknown action type: ${fullCheck}`);
  }
}

performAction({
  type: "CREATE_USER",
  payload: { name: "Olesya", age: 33 },
});

performAction({
  type: "DELETE_USER",
  payload: { userId: 101 },
});

performAction({
  type: "UPDATE_USER",
  payload: { userId: 1, name: "Vasyl" },
});

performAction({
  type: "BLOCK_USER",
  payload: { userId: 1, reason: "Too many requests" },
});
