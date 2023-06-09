import i18n from '#hami/ui/i18n';

export function getByErrorCode(errorCode = ''): string {
  console.log('fuck', errorCode);

  const error = i18n.message(errorCode);

  if (error === 'key_not_defined') {
    return i18n.message('error_in_connection_to_server');
  }

  return error;
}
