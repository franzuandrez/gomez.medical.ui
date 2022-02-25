

export function checkPermission(name, permissions) {



  return permissions.filter(permission => permission.name === name).length > 0;
}