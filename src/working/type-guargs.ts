
enum EntityType {
  USER = "USER",
  GUEST = "GUEST",
  ADMIN = "ADMIN",
  EXTERNAL_USER = "EXTERNAL_USER"
}

type User = {
  type: EntityType.USER;
  username: string;
  password: string;
};

type Guest = {
  type: EntityType.GUEST;
  sessionId: string;
};

type Admin = {
  type: EntityType.ADMIN;
  username: string;
  password: string;
  role: "admin";
};

type ExternalUser = {
  type: EntityType.EXTERNAL_USER;
  oauthToken: string;
};

type Entity = User | Guest | Admin | ExternalUser;


function isUser(entity: Entity): entity is User {
  return entity.type === EntityType.USER;
}

function isGuest(entity: Entity): entity is Guest {
  return entity.type === EntityType.GUEST;
}

function isAdmin(entity: Entity): entity is Admin {
  return entity.type === EntityType.ADMIN;
}

function isExternalUser(entity: Entity): entity is ExternalUser {
  return entity.type === EntityType.EXTERNAL_USER;
}


function login(entity: Entity): void {
  switch (entity.type) {
    case EntityType.USER:
      console.log(`User login: Username - ${entity.username}`);
      break;
    case EntityType.GUEST:
      console.log(`Guest login: Session ID - ${entity.sessionId}`);
      break;
    case EntityType.ADMIN:
      console.log(`Admin login: Username - ${entity.username}`);
      break;
    case EntityType.EXTERNAL_USER:
      console.log(`External user login: OAuth Token - ${entity.oauthToken}`);
      break;
    default:
      console.log("Unknown entity type");
  }
}


const user: User = { type: EntityType.USER, username: "vasyl_kisyl", password: "12345" };
const guest: Guest = { type: EntityType.GUEST, sessionId: "239120" };
const admin: Admin = { type: EntityType.ADMIN, username: "admin_vasyl", password: "admin123", role: "admin" };
const externalUser: ExternalUser = { type: EntityType.EXTERNAL_USER, oauthToken: "oauth_token_123" };

login(user);
login(guest);
login(admin);
