import i18n from '@gecut/i18n';

export function getByErrorCode(errorCode = ''): string {
  console.log('fuck', errorCode);

  const error = i18n.msg(errorCode);

  if (error === 'key_not_defined') {
    return i18n.msg('error_in_connection_to_server');
  }

  return error;
}
