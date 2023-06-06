import { apiServerErrorMessage } from '#hami/content';
import i18n from '#hami/ui/i18n';

export function getByErrorCode(errorCode: string): string {
  if (Object.keys(apiServerErrorMessage).includes(errorCode) === true) {
    return apiServerErrorMessage[
      errorCode as keyof typeof apiServerErrorMessage
    ];
  }

  return i18n.message('error_in_connection_to_server');
}
