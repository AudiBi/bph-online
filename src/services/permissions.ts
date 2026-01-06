export function hasPermission(
  userRoles: string[],
  required: string
) {
  return userRoles.includes(required);
}
